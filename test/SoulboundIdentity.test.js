const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoulboundIdentity", function () {
  let sbt;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const SoulboundIdentity = await ethers.getContractFactory("SoulboundIdentity");
    sbt = await SoulboundIdentity.deploy(owner.address);
    await sbt.deployed();
  });

  it("Only Admin (owner) can mint SBT", async function () {
    await expect(
      sbt.connect(user1).mintSBT(user1.address, "Alice", 1, "ipfs://alice")
    ).to.be.revertedWith("Ownable: caller is not the owner");

    await expect(
      sbt.connect(owner).mintSBT(user1.address, "Alice", 1, "ipfs://alice")
    ).to.emit(sbt, "Transfer"); // Standard ERC721 event
  });

  it("SBT cannot be transferred once minted", async function () {
    await sbt.connect(owner).mintSBT(user1.address, "Alice", 1, "ipfs://alice");

    await expect(
      sbt.connect(user1).transferFrom(user1.address, user2.address, 0)
    ).to.be.revertedWith("Soulbound tokens are non-transferable");
  });

  it("Only Admin can revoke an SBT", async function () {
    await sbt.connect(owner).mintSBT(user1.address, "Alice", 1, "ipfs://alice");

    await expect(
      sbt.connect(user1).revokeSBT(0)
    ).to.be.revertedWith("Ownable: caller is not the owner");

    await sbt.connect(owner).revokeSBT(0);

    const [, , , isRevoked] = await sbt.getSBTDetails(0);
    expect(isRevoked).to.equal(true);
  });

  it("Users can view their SBT details", async function () {
    await sbt.connect(owner).mintSBT(user1.address, "Alice", 1, "ipfs://alice");

    const [name, uniqueId, metadata, isRevoked] = await sbt.getSBTDetails(0);
    expect(name).to.equal("Alice");
    expect(uniqueId).to.equal(1);
    expect(metadata).to.equal("ipfs://alice");
    expect(isRevoked).to.equal(false);
  });
});
