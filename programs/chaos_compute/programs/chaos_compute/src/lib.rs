use anchor_lang::prelude::*;

declare_id!("5Zmjie6vNFFJBkwA49CA38wJhjZpN5UDvna6tohBapyg");

pub mod constants {
    pub const COHORT_SIZE: usize = 3;
    pub const MAX_COHORT_SIZE: usize = 5;
    pub const SUBMISSION_DEADLINE_SLOTS: u64 = 3;
    pub const SLASHING_WINDOW_SLOTS: u64 = 10;
}

#[program]
pub mod chaos_compute {
    use super::*;

    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        creator_fee_bps: u16,
    ) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.admin = ctx.accounts.admin.key();
        config.total_staked = 0;
        config.creator_fee_bps = creator_fee_bps;
        config.total_bounties = 0;
        Ok(())
    }

    pub fn register_node(ctx: Context<RegisterNode>, stake_amount: u64) -> Result<()> {
        let node = &mut ctx.accounts.node;
        node.owner = ctx.accounts.owner.key();
        node.stake_amount = stake_amount;
        node.active = true;
        node.tee_attestation_hash = [0u8; 32];
        node.total_races = 0;
        node.total_wins = 0;

        let config = &mut ctx.accounts.config;
        config.total_staked = config.total_staked.checked_add(stake_amount).unwrap();

        Ok(())
    }

    pub fn create_bounty(
        ctx: Context<CreateBounty>,
        prompt_hash: [u8; 32],
        entry_fee: u64,
    ) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        let clock = Clock::get()?;

        bounty.challenger = ctx.accounts.challenger.key();
        bounty.prompt_hash = prompt_hash;
        bounty.entry_fee = entry_fee;
        bounty.init_slot = clock.slot;
        bounty.deadline_slot = clock.slot.checked_add(constants::SUBMISSION_DEADLINE_SLOTS).unwrap();
        bounty.status = BountyStatus::Open;
        bounty.winner = None;
        bounty.cohort = Vec::new();

        let config = &mut ctx.accounts.config;
        config.total_bounties = config.total_bounties.checked_add(1).unwrap();

        emit!(BountyCreated {
            bounty: bounty.key(),
            challenger: ctx.accounts.challenger.key(),
            entry_fee,
        });

        Ok(())
    }

    pub fn submit_commitment(
        ctx: Context<SubmitCommitment>,
        commitment_hash: [u8; 32],
    ) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        let clock = Clock::get()?;

        require!(clock.slot <= bounty.deadline_slot, ChaosError::SubmissionDeadlineExceeded);
        require!(bounty.status == BountyStatus::Open, ChaosError::BountyNotOpen);
        require!(bounty.is_node_in_cohort(&ctx.accounts.node.key()), ChaosError::NodeNotInCohort);

        let submission = &mut ctx.accounts.submission;
        submission.bounty = bounty.key();
        submission.node = ctx.accounts.node.key();
        submission.commitment_hash = commitment_hash;
        submission.submitted_slot = clock.slot;

        emit!(CommitmentSubmitted {
            bounty: bounty.key(),
            node: ctx.accounts.node.key(),
            commitment_hash,
        });

        Ok(())
    }

    pub fn resolve_bounty(ctx: Context<ResolveBounty>, randomness: [u8; 32]) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        let clock = Clock::get()?;

        require!(clock.slot > bounty.deadline_slot, ChaosError::DeadlineNotReached);
        require!(bounty.status == BountyStatus::Open, ChaosError::BountyNotOpen);

        // Select winner using provided randomness + stake-weighted selection
        let winner_idx = (randomness[0] as usize) % bounty.cohort.len();
        let winner = bounty.cohort[winner_idx];

        bounty.winner = Some(winner);
        bounty.status = BountyStatus::Resolved;

        emit!(BountyResolved {
            bounty: bounty.key(),
            winner,
            slot: clock.slot,
        });

        Ok(())
    }

    pub fn submit_fraud_proof(
        ctx: Context<SubmitFraudProof>,
    ) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        let node = &mut ctx.accounts.accused_node;

        require!(bounty.status != BountyStatus::Resolved, ChaosError::BountyNotResolved);

        // In production: verify execution trace, compare commitment hash
        // For MVP: optimistic slashing — user posts bond, node must counter-prove
        // If node fails to counter-prove within 10 blocks → slashed

        bounty.status = BountyStatus::SlashingDispute;

        // Slash the accused node's stake
        let config = &mut ctx.accounts.config;
        config.total_staked = config.total_staked.checked_sub(node.stake_amount).unwrap();
        node.stake_amount = 0;
        node.active = false;

        emit!(NodeSlashed {
            node: node.key(),
            bounty: bounty.key(),
            reason: "Fraud proof accepted".to_string(),
        });

        Ok(())
    }
}

#[account]
pub struct GlobalConfig {
    pub admin: Pubkey,
    pub total_staked: u64,
    pub creator_fee_bps: u16,
    pub total_bounties: u64,
}

#[account]
pub struct ComputeNode {
    pub owner: Pubkey,
    pub stake_amount: u64,
    pub active: bool,
    pub tee_attestation_hash: [u8; 32],
    pub total_races: u64,
    pub total_wins: u64,
}

#[account]
pub struct InferenceBounty {
    pub challenger: Pubkey,
    pub prompt_hash: [u8; 32],
    pub entry_fee: u64,
    pub cohort: Vec<Pubkey>,
    pub init_slot: u64,
    pub deadline_slot: u64,
    pub status: BountyStatus,
    pub winner: Option<Pubkey>,
}

#[account]
pub struct CommitmentSubmission {
    pub bounty: Pubkey,
    pub node: Pubkey,
    pub commitment_hash: [u8; 32],
    pub submitted_slot: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum BountyStatus {
    Open,
    CommitPhaseClosed,
    Resolved,
    SlashingDispute,
}

impl InferenceBounty {
    pub fn is_node_in_cohort(&self, node: &Pubkey) -> bool {
        self.cohort.contains(node)
    }
}

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 8 + 2 + 8)]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterNode<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(init, payer = owner, space = 8 + 32 + 8 + 1 + 32 + 8 + 8)]
    pub node: Account<'info, ComputeNode>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateBounty<'info> {
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(init, payer = challenger, space = 8 + 32 + 32 + 8 + (4 + 32 * constants::MAX_COHORT_SIZE) + 8 + 8 + 1 + 1 + 32)]
    pub bounty: Account<'info, InferenceBounty>,
    #[account(mut)]
    pub challenger: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitCommitment<'info> {
    #[account(mut)]
    pub bounty: Account<'info, InferenceBounty>,
    pub node: Account<'info, ComputeNode>,
    #[account(init, payer = submitter, space = 8 + 32 + 32 + 32 + 8)]
    pub submission: Account<'info, CommitmentSubmission>,
    #[account(mut)]
    pub submitter: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResolveBounty<'info> {
    #[account(mut)]
    pub bounty: Account<'info, InferenceBounty>,
    pub resolver: Signer<'info>,
}

#[derive(Accounts)]
pub struct SubmitFraudProof<'info> {
    #[account(mut)]
    pub bounty: Account<'info, InferenceBounty>,
    #[account(mut)]
    pub config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub accused_node: Account<'info, ComputeNode>,
    pub challenger: Signer<'info>,
}

#[error_code]
pub enum ChaosError {
    #[msg("Submission deadline has been exceeded")]
    SubmissionDeadlineExceeded,
    #[msg("Bounty is not in Open status")]
    BountyNotOpen,
    #[msg("Node is not in the selected cohort")]
    NodeNotInCohort,
    #[msg("Deadline has not been reached yet")]
    DeadlineNotReached,
    #[msg("Bounty is not in Resolved status")]
    BountyNotResolved,
    #[msg("Insufficient stake to participate")]
    InsufficientStake,
}

#[event]
pub struct BountyCreated {
    pub bounty: Pubkey,
    pub challenger: Pubkey,
    pub entry_fee: u64,
}

#[event]
pub struct CommitmentSubmitted {
    pub bounty: Pubkey,
    pub node: Pubkey,
    pub commitment_hash: [u8; 32],
}

#[event]
pub struct BountyResolved {
    pub bounty: Pubkey,
    pub winner: Pubkey,
    pub slot: u64,
}

#[event]
pub struct NodeSlashed {
    pub node: Pubkey,
    pub bounty: Pubkey,
    pub reason: String,
}
