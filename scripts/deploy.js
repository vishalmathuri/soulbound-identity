// const hre = require("hardhat");

// async function main() {
//   const [deployer] = await hre.ethers.getSigners();

//   console.log("Deploying contract with the account:", deployer.address);

//   const SoulboundIdentity = await hre.ethers.getContractFactory("SoulboundIdentity");
//   const contract = await SoulboundIdentity.deploy(deployer.address); // 🟢 Pass deployer address

//   await contract.deployed();

//   console.log("SoulboundIdentity deployed to:", contract.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  const SoulboundIdentity = await hre.ethers.getContractFactory("SoulboundIdentity");
  const contract = await SoulboundIdentity.deploy(deployer.address); // Pass initialOwner
  await contract.waitForDeployment(); // instead of .deployed()

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
