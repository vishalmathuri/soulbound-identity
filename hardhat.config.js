// // Local Network
// require("@nomicfoundation/hardhat-toolbox");

// module.exports = {
//   solidity: "0.8.28",
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545",
//     },
//   },
// };


// Sepolia Testnet 
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // To load PRIVATE_KEY and INFURA/ALCHEMY_API_KEY from .env

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, // or Alchemy
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

