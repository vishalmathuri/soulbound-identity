const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoulboundIdentity", function () {
  let SoulboundIdentity, soulbound, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const SoulboundIdentityFactory = await ethers.getContractFactory("SoulboundIdentity");
    soulbound = await SoulboundIdentityFactory.deploy(owner.address);
    await soulbound.waitForDeployment();
  });

  it("Only Admin (owner) can mint SBT", async function () {
    // Try minting from a non-owner account (should fail with custom error)
    await expect(
      soulbound.connect(addr1).mintSBT(addr1.address, "Vishal", 1, "https://example.com/vishal")
    ).to.be.revertedWithCustomError(soulbound, "OwnableUnauthorizedAccount");
  });

  it("SBT cannot be transferred once minted", async function () {
    await soulbound.mintSBT(addr1.address, "Vishal", 1, "https://example.com/vishal");
    await expect(
      soulbound.connect(addr1).transferFrom(addr1.address, owner.address, 0)
    ).to.be.revertedWith("Soulbound tokens are non-transferable");
  });

  it("Only Admin can revoke an SBT", async function () {
    await soulbound.mintSBT(addr1.address, "Vishal", 1, "https://example.com/vishal");
    await expect(
      soulbound.connect(addr1).revokeSBT(0)
    ).to.be.revertedWithCustomError(soulbound, "OwnableUnauthorizedAccount");
  });

  it("Users can view their SBT details", async function () {
    await soulbound.mintSBT(addr1.address, "Vishal", 1, "https://example.com/vishal");
    const details = await soulbound.getSBTDetails(0);
    expect(details.name).to.equal("Vishal");
    expect(details.uniqueId).to.equal(1);
    expect(details.metadata).to.equal("https://example.com/vishal");
    expect(details.isRevoked).to.equal(false);
  });
});
