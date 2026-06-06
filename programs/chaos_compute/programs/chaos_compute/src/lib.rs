use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg");

pub mod constants {
    pub const COHORT_SIZE: usize = 3;
    pub const MAX_COHORT_SIZE: usize = 5;
    pub const COMMIT_PHASE_SLOTS: u64 = 3;
    pub const REVEAL_PHASE_SLOTS: u64 = 3;
    pub const SLASHING_WINDOW_SLOTS: u64 = 10;
    pub const MIN_STAKE_STANDARD: u64 = 100_000_000_000; // 100 SOL
    pub const MIN_STAKE_PRO: u64 = 500_000_000_000; // 500 SOL
    pub const MIN_STAKE_ENTERPRISE: u64 = 1_000_000_000_000; // 1000 SOL
    pub const UNSTAKE_COOLDOWN_SLOTS: u64 = 432_000; // ~7 days at 400ms slots
    pub const TEE_FRESHNESS_SLOTS: u64 = 100;
    pub const FRAUD_BOND_AMOUNT: u64 = 10_000_000_000; // 10 SOL bond
}

#[program]
pub mod chaos_compute {
    use super::*;

    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        protocol_fee_bps: u16,
    ) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.admin = ctx.accounts.admin.key();
        config.protocol_fee_bps = protocol_fee_bps;
        config.total_staked = 0;
        config.total_jobs = 0;
        config.total_slashed = 0;
        Ok(())
    }

    pub fn register_node(
        ctx: Context<RegisterNode>,
        stake_amount: u64,
        tee_attestation_hash: [u8; 32],
    ) -> Result<()> {
        require!(
            stake_amount >= constants::MIN_STAKE_STANDARD,
            ChaosError::InsufficientStake
        );

        let config = &mut ctx.accounts.config;
        let node = &mut ctx.accounts.node;
        let clock = Clock::get()?;

        // Transfer SOL from owner to stake vault (real escrow)
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.owner.to_account_info(),
                    to: ctx.accounts.stake_vault.to_account_info(),
                },
            ),
            stake_amount,
        )?;

        node.owner = ctx.accounts.owner.key();
        node.stake_amount = stake_amount;
        node.active = true;
        node.tee_attestation_hash = tee_attestation_hash;
        node.attestation_slot = clock.slot;
        node.total_races = 0;
        node.total_wins = 0;
        node.unstake_request_slot = 0;

        config.total_staked = config.total_staked.checked_add(stake_amount).unwrap();

        emit!(NodeRegistered {
            node: node.key(),
            owner: ctx.accounts.owner.key(),
            stake_amount,
        });

        Ok(())
    }

    pub fn update_tee_attestation(
        ctx: Context<UpdateTeeAttestation>,
        new_attestation_hash: [u8; 32],
    ) -> Result<()> {
        let node = &mut ctx.accounts.node;
        let clock = Clock::get()?;

        require!(
            ctx.accounts.owner.key() == node.owner,
            ChaosError::Unauthorized
        );
        require!(node.active, ChaosError::NodeInactive);

        node.tee_attestation_hash = new_attestation_hash;
        node.attestation_slot = clock.slot;

        emit!(AttestationUpdated {
            node: node.key(),
            attestation_slot: clock.slot,
        });

        Ok(())
    }

    pub fn request_unstake(ctx: Context<RequestUnstake>) -> Result<()> {
        let node = &mut ctx.accounts.node;
        let clock = Clock::get()?;

        require!(
            ctx.accounts.owner.key() == node.owner,
            ChaosError::Unauthorized
        );
        require!(node.active, ChaosError::NodeInactive);
        require!(
            node.unstake_request_slot == 0,
            ChaosError::UnstakeAlreadyRequested
        );

        node.unstake_request_slot = clock.slot;

        emit!(UnstakeRequested {
            node: node.key(),
            cooldown_ends_slot: clock
                .slot
                .checked_add(constants::UNSTAKE_COOLDOWN_SLOTS)
                .unwrap(),
        });

        Ok(())
    }

    pub fn execute_unstake(ctx: Context<ExecuteUnstake>) -> Result<()> {
        let node = &mut ctx.accounts.node;
        let config = &mut ctx.accounts.config;
        let clock = Clock::get()?;

        require!(
            ctx.accounts.owner.key() == node.owner,
            ChaosError::Unauthorized
        );
        require!(
            node.unstake_request_slot > 0,
            ChaosError::NoUnstakeRequested
        );
        require!(
            clock.slot >= node.unstake_request_slot + constants::UNSTAKE_COOLDOWN_SLOTS,
            ChaosError::CooldownNotReached
        );

        let stake_amount = node.stake_amount;

        // Transfer SOL back from stake vault to owner
        let seeds = &[b"stake_vault".as_ref(), &[ctx.bumps.stake_vault]];
        system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.stake_vault.to_account_info(),
                    to: ctx.accounts.owner.to_account_info(),
                },
                &[&[seeds[0], seeds[1]]],
            ),
            stake_amount,
        )?;

        config.total_staked = config.total_staked.checked_sub(stake_amount).unwrap();
        node.stake_amount = 0;
        node.active = false;
        node.unstake_request_slot = 0;

        emit!(UnstakeExecuted {
            node: node.key(),
            stake_amount,
        });

        Ok(())
    }

    pub fn create_job(
        ctx: Context<CreateJob>,
        prompt_hash: [u8; 32],
        bounty_amount: u64,
        model_id: [u8; 32],
    ) -> Result<()> {
        let job = &mut ctx.accounts.job;
        let clock = Clock::get()?;

        job.consumer = ctx.accounts.consumer.key();
        job.prompt_hash = prompt_hash;
        job.model_id = model_id;
        job.bounty_amount = bounty_amount;
        job.init_slot = clock.slot;
        job.commit_deadline = clock
            .slot
            .checked_add(constants::COMMIT_PHASE_SLOTS)
            .unwrap();
        job.reveal_deadline = clock
            .slot
            .checked_add(constants::COMMIT_PHASE_SLOTS)
            .unwrap()
            .checked_add(constants::REVEAL_PHASE_SLOTS)
            .unwrap();
        job.status = JobStatus::Open;
        job.cohort = Vec::new();
        job.winner = None;
        job.submission_count = 0;

        let config = &mut ctx.accounts.config;
        config.total_jobs = config.total_jobs.checked_add(1).unwrap();

        emit!(JobCreated {
            job: job.key(),
            consumer: ctx.accounts.consumer.key(),
            bounty_amount,
        });

        Ok(())
    }

    pub fn select_cohort(ctx: Context<SelectCohort>, randomness: [u8; 32]) -> Result<()> {
        let job = &mut ctx.accounts.job;

        require!(job.status == JobStatus::Open, ChaosError::JobNotOpen);
        require!(job.cohort.is_empty(), ChaosError::CohortAlreadySelected);

        // For MVP: select from config's registered nodes
        // In production: iterate remaining_accounts for eligible nodes

        // Simple random selection using randomness + cohort size
        let mut selected: Vec<Pubkey> = Vec::new();

        for i in 0..constants::COHORT_SIZE {
            let rand_byte = randomness[i % randomness.len()];
            // Use pseudo-random selection based on randomness
            let _seed = rand_byte as usize;
            // In production: load actual node accounts and do sqrt(stake) weighted selection
            // For MVP: placeholder selection (will be replaced with actual node selection)
        }

        // If no nodes registered yet, use job creator as placeholder
        if selected.is_empty() {
            selected.push(job.consumer);
        }

        job.cohort = selected.clone();
        job.status = JobStatus::CohortSelected;

        emit!(CohortSelected {
            job: job.key(),
            cohort: selected,
        });

        Ok(())
    }

    pub fn submit_commitment(
        ctx: Context<SubmitCommitment>,
        commitment_hash: [u8; 32],
    ) -> Result<()> {
        let job = &mut ctx.accounts.job;
        let clock = Clock::get()?;

        require!(
            clock.slot <= job.commit_deadline,
            ChaosError::CommitDeadlineExceeded
        );
        require!(
            job.status == JobStatus::CohortSelected || job.status == JobStatus::CommitPhase,
            ChaosError::JobNotInCommitPhase
        );
        require!(
            job.cohort.contains(&ctx.accounts.node.key()),
            ChaosError::NodeNotInCohort
        );

        job.status = JobStatus::CommitPhase;

        let submission = &mut ctx.accounts.submission;
        submission.job = job.key();
        submission.node = ctx.accounts.node.key();
        submission.commitment_hash = commitment_hash;
        submission.submitted_slot = clock.slot;
        submission.revealed = false;

        job.submission_count = job.submission_count.checked_add(1).unwrap();

        emit!(CommitmentSubmitted {
            job: job.key(),
            node: ctx.accounts.node.key(),
            commitment_hash,
        });

        Ok(())
    }

    pub fn reveal_output(
        ctx: Context<RevealOutput>,
        output_hash: [u8; 32],
        output_data: Vec<u8>,
    ) -> Result<()> {
        let job = &mut ctx.accounts.job;
        let clock = Clock::get()?;

        require!(
            clock.slot > job.commit_deadline,
            ChaosError::RevealPhaseNotStarted
        );
        require!(
            clock.slot <= job.reveal_deadline,
            ChaosError::RevealDeadlineExceeded
        );
        require!(
            job.status == JobStatus::CommitPhase || job.status == JobStatus::RevealPhase,
            ChaosError::JobNotInRevealPhase
        );
        require!(
            job.cohort.contains(&ctx.accounts.node.key()),
            ChaosError::NodeNotInCohort
        );

        job.status = JobStatus::RevealPhase;

        let submission = &mut ctx.accounts.submission;

        // Verify commitment: hash(output_data) == commitment_hash
        let computed_hash = anchor_lang::solana_program::hash::hash(&output_data);
        require!(
            computed_hash.to_bytes() == submission.commitment_hash,
            ChaosError::CommitmentMismatch
        );

        submission.output_hash = output_hash;
        submission.output_data = output_data;
        submission.revealed = true;

        emit!(OutputRevealed {
            job: job.key(),
            node: ctx.accounts.node.key(),
            output_hash,
        });

        Ok(())
    }

    pub fn resolve_job(ctx: Context<ResolveJob>, randomness: [u8; 32]) -> Result<()> {
        let job = &mut ctx.accounts.job;
        let clock = Clock::get()?;

        require!(
            clock.slot > job.reveal_deadline,
            ChaosError::RevealDeadlineNotReached
        );
        require!(
            job.status == JobStatus::RevealPhase,
            ChaosError::JobNotInRevealPhase
        );
        require!(!job.cohort.is_empty(), ChaosError::NoEligibleNodes);

        // Pick winner from cohort using randomness
        // In production: filter to nodes that submitted valid reveals
        // For MVP: select from full cohort
        let rand_idx = (randomness[0] as usize) % job.cohort.len();
        let winner = job.cohort[rand_idx];

        job.winner = Some(winner);
        job.status = JobStatus::Settled;

        emit!(JobSettled {
            job: job.key(),
            winner,
            bounty_amount: job.bounty_amount,
        });

        Ok(())
    }

    pub fn submit_fraud_proof(
        ctx: Context<SubmitFraudProof>,
        _evidence: Vec<u8>,
    ) -> Result<()> {
        let job = &mut ctx.accounts.job;
        let dispute = &mut ctx.accounts.dispute;
        let clock = Clock::get()?;

        require!(
            job.status == JobStatus::Settled,
            ChaosError::JobNotSettled
        );
        require!(
            ctx.accounts.accuser.key() != job.winner.unwrap_or(Pubkey::default()),
            ChaosError::CannotAccuseSelf
        );

        // Accuser posts bond
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.accuser.to_account_info(),
                    to: ctx.accounts.dispute_vault.to_account_info(),
                },
            ),
            constants::FRAUD_BOND_AMOUNT,
        )?;

        dispute.job = job.key();
        dispute.accused_node = job.winner.unwrap();
        dispute.accuser = ctx.accounts.accuser.key();
        dispute.bond_amount = constants::FRAUD_BOND_AMOUNT;
        dispute.filed_slot = clock.slot;
        dispute.counter_deadline = clock
            .slot
            .checked_add(constants::SLASHING_WINDOW_SLOTS)
            .unwrap();
        dispute.status = DisputeStatus::Open;

        emit!(FraudProofFiled {
            job: job.key(),
            accused_node: job.winner.unwrap(),
            accuser: ctx.accounts.accuser.key(),
        });

        Ok(())
    }

    pub fn counter_fraud_proof(ctx: Context<CounterFraudProof>) -> Result<()> {
        let dispute = &mut ctx.accounts.dispute;
        let clock = Clock::get()?;

        require!(
            dispute.status == DisputeStatus::Open,
            ChaosError::DisputeNotOpen
        );
        require!(
            clock.slot <= dispute.counter_deadline,
            ChaosError::CounterDeadlineExceeded
        );
        require!(
            ctx.accounts.node_owner.key() == ctx.accounts.accused_node.owner,
            ChaosError::Unauthorized
        );

        dispute.status = DisputeStatus::Countered;

        // Return bond to accuser (counter-proof valid)
        // In production: verify TEE attestation + output hash match
        // For MVP: if counter-proof filed within window, dispute dismissed

        emit!(FraudProofCountered {
            job: dispute.job,
            accused_node: dispute.accused_node,
        });

        Ok(())
    }

    pub fn resolve_dispute(ctx: Context<ResolveDispute>) -> Result<()> {
        let dispute = &mut ctx.accounts.dispute;
        let config = &mut ctx.accounts.config;
        let accused_node = &mut ctx.accounts.accused_node;
        let clock = Clock::get()?;

        require!(
            dispute.status == DisputeStatus::Open,
            ChaosError::DisputeNotOpen
        );
        require!(
            clock.slot > dispute.counter_deadline,
            ChaosError::CounterWindowNotExpired
        );

        // No counter-proof filed — slash the accused node
        let slash_amount = accused_node.stake_amount;

        // Transfer slashed SOL to treasury (config admin)
        let vault_seeds = &[b"dispute_vault".as_ref(), &[ctx.bumps.dispute_vault]];
        system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.dispute_vault.to_account_info(),
                    to: ctx.accounts.treasury.to_account_info(),
                },
                &[&[vault_seeds[0], vault_seeds[1]]],
            ),
            dispute.bond_amount,
        )?;

        // Slash node stake
        let stake_seeds = &[b"stake_vault".as_ref(), &[ctx.bumps.stake_vault]];
        system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.stake_vault.to_account_info(),
                    to: ctx.accounts.treasury.to_account_info(),
                },
                &[&[stake_seeds[0], stake_seeds[1]]],
            ),
            slash_amount,
        )?;

        config.total_staked = config.total_staked.checked_sub(slash_amount).unwrap();
        config.total_slashed = config.total_slashed.checked_add(1).unwrap();
        accused_node.stake_amount = 0;
        accused_node.active = false;

        dispute.status = DisputeStatus::ResolvedSlash;

        emit!(NodeSlashed {
            node: dispute.accused_node,
            amount: slash_amount,
        });

        Ok(())
    }

    pub fn update_config(
        ctx: Context<UpdateConfig>,
        protocol_fee_bps: Option<u16>,
    ) -> Result<()> {
        let config = &mut ctx.accounts.config;
        require!(
            ctx.accounts.admin.key() == config.admin,
            ChaosError::Unauthorized
        );

        if let Some(fee) = protocol_fee_bps {
            config.protocol_fee_bps = fee;
        }

        Ok(())
    }
}

// ─── Accounts ────────────────────────────────────────────────────────────────

#[account]
pub struct GlobalConfig {
    pub admin: Pubkey,
    pub protocol_fee_bps: u16,
    pub total_staked: u64,
    pub total_jobs: u64,
    pub total_slashed: u64,
}

#[account]
pub struct ComputeNode {
    pub owner: Pubkey,
    pub stake_amount: u64,
    pub active: bool,
    pub tee_attestation_hash: [u8; 32],
    pub attestation_slot: u64,
    pub total_races: u64,
    pub total_wins: u64,
    pub unstake_request_slot: u64,
}

#[account]
pub struct Job {
    pub consumer: Pubkey,
    pub prompt_hash: [u8; 32],
    pub model_id: [u8; 32],
    pub bounty_amount: u64,
    pub init_slot: u64,
    pub commit_deadline: u64,
    pub reveal_deadline: u64,
    pub status: JobStatus,
    pub cohort: Vec<Pubkey>,
    pub winner: Option<Pubkey>,
    pub submission_count: u8,
}

#[account]
pub struct JobSubmission {
    pub job: Pubkey,
    pub node: Pubkey,
    pub commitment_hash: [u8; 32],
    pub output_hash: [u8; 32],
    pub output_data: Vec<u8>,
    pub submitted_slot: u64,
    pub revealed: bool,
}

#[account]
pub struct SlashingDispute {
    pub job: Pubkey,
    pub accused_node: Pubkey,
    pub accuser: Pubkey,
    pub bond_amount: u64,
    pub filed_slot: u64,
    pub counter_deadline: u64,
    pub status: DisputeStatus,
}

// ─── Enums ───────────────────────────────────────────────────────────────────

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum JobStatus {
    Open,
    CohortSelected,
    CommitPhase,
    RevealPhase,
    Settled,
    Refunded,
    SlashingDispute,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum DisputeStatus {
    Open,
    Countered,
    ResolvedSlash,
    ResolvedDismissed,
}

// ─── Contexts ────────────────────────────────────────────────────────────────

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 2 + 8 + 8 + 8)]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterNode<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 8 + 1 + 32 + 8 + 8 + 8 + 8
    )]
    pub node: Account<'info, ComputeNode>,
    /// CHECK: PDA holding escrowed SOL
    #[account(
        mut,
        seeds = [b"stake_vault"],
        bump
    )]
    pub stake_vault: AccountInfo<'info>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateTeeAttestation<'info> {
    #[account(mut)]
    pub node: Account<'info, ComputeNode>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct RequestUnstake<'info> {
    #[account(mut)]
    pub node: Account<'info, ComputeNode>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct ExecuteUnstake<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(
        mut,
        has_one = owner,
        constraint = node.unstake_request_slot > 0
    )]
    pub node: Account<'info, ComputeNode>,
    /// CHECK: PDA holding escrowed SOL
    #[account(
        mut,
        seeds = [b"stake_vault"],
        bump
    )]
    pub stake_vault: AccountInfo<'info>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateJob<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(
        init,
        payer = consumer,
        space = 8 + 32 + 32 + 32 + 8 + 8 + 8 + 8 + 1 + (4 + 32 * 5) + 1 + 32 + 1
    )]
    pub job: Account<'info, Job>,
    #[account(mut)]
    pub consumer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SelectCohort<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub job: Account<'info, Job>,
    pub selector: Signer<'info>,
    // Remaining accounts: node accounts to select from
}

#[derive(Accounts)]
pub struct SubmitCommitment<'info> {
    #[account(mut)]
    pub job: Account<'info, Job>,
    pub node: Account<'info, ComputeNode>,
    #[account(
        init,
        payer = submitter,
        space = 8 + 32 + 32 + 32 + 32 + (4 + 2048) + 8 + 1
    )]
    pub submission: Account<'info, JobSubmission>,
    #[account(mut)]
    pub submitter: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevealOutput<'info> {
    #[account(mut)]
    pub job: Account<'info, Job>,
    #[account(
        mut,
        has_one = node,
        constraint = submission.job == job.key()
    )]
    pub submission: Account<'info, JobSubmission>,
    pub node: Account<'info, ComputeNode>,
}

#[derive(Accounts)]
pub struct ResolveJob<'info> {
    #[account(mut)]
    pub job: Account<'info, Job>,
    pub resolver: Signer<'info>,
}

#[derive(Accounts)]
pub struct SubmitFraudProof<'info> {
    #[account(mut)]
    pub job: Account<'info, Job>,
    #[account(
        init,
        payer = accuser,
        space = 8 + 32 + 32 + 32 + 8 + 8 + 8 + 1
    )]
    pub dispute: Account<'info, SlashingDispute>,
    /// CHECK: PDA for dispute bond escrow
    #[account(
        mut,
        seeds = [b"dispute_vault"],
        bump
    )]
    pub dispute_vault: AccountInfo<'info>,
    #[account(mut)]
    pub accuser: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CounterFraudProof<'info> {
    #[account(mut)]
    pub dispute: Account<'info, SlashingDispute>,
    #[account(
        mut,
        constraint = accused_node.owner == node_owner.key()
    )]
    pub accused_node: Account<'info, ComputeNode>,
    pub node_owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct ResolveDispute<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub dispute: Account<'info, SlashingDispute>,
    #[account(mut)]
    pub accused_node: Account<'info, ComputeNode>,
    /// CHECK: PDA holding escrowed SOL
    #[account(
        mut,
        seeds = [b"stake_vault"],
        bump
    )]
    pub stake_vault: AccountInfo<'info>,
    /// CHECK: PDA for dispute bond escrow
    #[account(
        mut,
        seeds = [b"dispute_vault"],
        bump
    )]
    pub dispute_vault: AccountInfo<'info>,
    /// CHECK: Treasury account
    #[account(mut)]
    pub treasury: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateConfig<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    pub admin: Signer<'info>,
}

// ─── Errors ──────────────────────────────────────────────────────────────────

#[error_code]
pub enum ChaosError {
    #[msg("Insufficient stake for tier")]
    InsufficientStake,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Node is not active")]
    NodeInactive,
    #[msg("Unstake already requested")]
    UnstakeAlreadyRequested,
    #[msg("No unstake requested")]
    NoUnstakeRequested,
    #[msg("Unstake cooldown not reached")]
    CooldownNotReached,
    #[msg("Job is not in Open status")]
    JobNotOpen,
    #[msg("Cohort already selected")]
    CohortAlreadySelected,
    #[msg("No eligible nodes")]
    NoEligibleNodes,
    #[msg("Insufficient eligible nodes for cohort")]
    InsufficientNodes,
    #[msg("Commit deadline exceeded")]
    CommitDeadlineExceeded,
    #[msg("Job not in commit phase")]
    JobNotInCommitPhase,
    #[msg("Node not in cohort")]
    NodeNotInCohort,
    #[msg("Reveal phase not started")]
    RevealPhaseNotStarted,
    #[msg("Reveal deadline exceeded")]
    RevealDeadlineExceeded,
    #[msg("Job not in reveal phase")]
    JobNotInRevealPhase,
    #[msg("Commitment hash does not match output")]
    CommitmentMismatch,
    #[msg("Reveal deadline not reached")]
    RevealDeadlineNotReached,
    #[msg("Job not settled")]
    JobNotSettled,
    #[msg("Cannot accuse yourself")]
    CannotAccuseSelf,
    #[msg("Dispute not open")]
    DisputeNotOpen,
    #[msg("Counter-proof deadline exceeded")]
    CounterDeadlineExceeded,
    #[msg("Counter window not expired")]
    CounterWindowNotExpired,
}

// ─── Events ──────────────────────────────────────────────────────────────────

#[event]
pub struct NodeRegistered {
    pub node: Pubkey,
    pub owner: Pubkey,
    pub stake_amount: u64,
}

#[event]
pub struct AttestationUpdated {
    pub node: Pubkey,
    pub attestation_slot: u64,
}

#[event]
pub struct UnstakeRequested {
    pub node: Pubkey,
    cooldown_ends_slot: u64,
}

#[event]
pub struct UnstakeExecuted {
    pub node: Pubkey,
    pub stake_amount: u64,
}

#[event]
pub struct JobCreated {
    pub job: Pubkey,
    pub consumer: Pubkey,
    pub bounty_amount: u64,
}

#[event]
pub struct CohortSelected {
    pub job: Pubkey,
    pub cohort: Vec<Pubkey>,
}

#[event]
pub struct CommitmentSubmitted {
    pub job: Pubkey,
    pub node: Pubkey,
    pub commitment_hash: [u8; 32],
}

#[event]
pub struct OutputRevealed {
    pub job: Pubkey,
    pub node: Pubkey,
    pub output_hash: [u8; 32],
}

#[event]
pub struct JobSettled {
    pub job: Pubkey,
    pub winner: Pubkey,
    pub bounty_amount: u64,
}

#[event]
pub struct JobRefunded {
    pub job: Pubkey,
    pub reason: String,
}

#[event]
pub struct FraudProofFiled {
    pub job: Pubkey,
    pub accused_node: Pubkey,
    pub accuser: Pubkey,
}

#[event]
pub struct FraudProofCountered {
    pub job: Pubkey,
    pub accused_node: Pubkey,
}

#[event]
pub struct NodeSlashed {
    pub node: Pubkey,
    pub amount: u64,
}
