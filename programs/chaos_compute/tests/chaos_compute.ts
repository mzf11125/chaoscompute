import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { ChaosCompute } from "../target/types/chaos_compute"
import { expect } from "chai"

describe("chaos_compute", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.ChaosCompute as Program<ChaosCompute>

  let configPda: anchor.web3.PublicKey
  let configBump: number

  before(async () => {
    ;[configPda, configBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId,
    )
  })

  it("initializes the global config", async () => {
    const tx = await program.methods
      .initializeConfig(100) // 1% creator fee
      .accounts({
        config: configPda,
        admin: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    const config = await program.account.globalConfig.fetch(configPda)
    expect(config.admin.toString()).to.equal(provider.wallet.publicKey.toString())
    expect(config.creatorFeeBps).to.equal(100)
    expect(config.totalStaked.toNumber()).to.equal(0)
  })

  it("registers a compute node", async () => {
    const nodeOwner = anchor.web3.Keypair.generate()
    const [nodePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("node"), nodeOwner.publicKey.toBuffer()],
      program.programId,
    )

    // Fund the node owner
    await provider.connection.requestAirdrop(nodeOwner.publicKey, 2_000_000_000)

    const tx = await program.methods
      .registerNode(new anchor.BN(1000))
      .accounts({
        config: configPda,
        node: nodePda,
        owner: nodeOwner.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([nodeOwner])
      .rpc()

    const node = await program.account.computeNode.fetch(nodePda)
    expect(node.owner.toString()).to.equal(nodeOwner.publicKey.toString())
    expect(node.stakeAmount.toNumber()).to.equal(1000)
    expect(node.active).to.equal(true)
  })

  it("creates an inference bounty", async () => {
    const challenger = anchor.web3.Keypair.generate()
    await provider.connection.requestAirdrop(challenger.publicKey, 2_000_000_000)

    const [bountyPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("bounty"), challenger.publicKey.toBuffer(), Buffer.from([0])],
      program.programId,
    )

    const promptHash = Buffer.alloc(32)
    promptHash.fill(1)

    const tx = await program.methods
      .createBounty([...promptHash], new anchor.BN(100))
      .accounts({
        config: configPda,
        bounty: bountyPda,
        challenger: challenger.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([challenger])
      .rpc()

    const bounty = await program.account.inferenceBounty.fetch(bountyPda)
    expect(bounty.challenger.toString()).to.equal(challenger.publicKey.toString())
    expect(bounty.status).to.deep.equal({ open: {} })
  })
})
