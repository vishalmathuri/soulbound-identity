Here's a complete `README.md` file for your **Soulbound Identity** project, including setup, testing, and deployment steps:

---

```markdown
# Soulbound Identity (SBT)

A decentralized identity management system using **Soulbound Tokens (SBTs)**. These non-transferable ERC-721 tokens represent unique, permanent credentials that cannot be traded or transferred.

## 📜 Results on sepolia testnet

Contract deployed to: 0xFDdC7F816a8021CB6D4A568C2D35269054F05c48
Transaction Hash: 0x17ee89084e6b87bd9e731a916bb4378bd456a222c12ae32da5568fea42b9c7c6



## 📜 Features

- ✅ Only admin (contract owner) can mint Soulbound Tokens.
- ✅ Tokens are non-transferable (soulbound).
- ✅ Tokens can be revoked by the admin.
- ✅ Users can view their SBT details.
- ✅ Secure and compliant with OpenZeppelin Contracts v5.

---

## 🔧 Tech Stack

- Solidity `^0.8.20`
- Hardhat
- OpenZeppelin Contracts `^5.3.0`
- Ethers.js
- Sepolia Testnet

---

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vishalmathuri/soulbound-identity
cd soulbound-identity

### 2. Install Dependencies

npm install
```

### 3. Configure Environment

Edit `.env` file:

```env
INFURA_API_KEY=your_infura_project_id
PRIVATE_KEY=your_private_key
```

---

## 🧪 Run Tests

```bash
npx hardhat test
```

Tests include:

* Only admin can mint SBT
* SBTs are non-transferable
* Only admin can revoke an SBT
* Users can view SBT details

---

## 🛰 Deploy to Local Network

### Step 1: Configure Hardhat for Local Development

Update your `hardhat.config.js` file to include both local and Sepolia networks. Make sure the **local network configuration is active** and **Sepolia is commented out** when deploying locally.

```js
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat node
    },
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`]
    // }
  }
};
```

### Step 2: Run a Local Node

In a terminal, start the local Hardhat node:

```bash
npx hardhat node
```

Leave this terminal running.

### Step 3: Deploy to Local Network

In a separate terminal, run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

You should see output similar to:

```
Deploying contract with the account: 0x...
Contract deployed to: 0x...
```

---

## 🌐 Deploy to Sepolia Testnet

> ⚠️ When deploying to Sepolia, **comment out the `localhost` block** and **uncomment the `sepolia` block** in your `hardhat.config.js`.

### Step 1: Configure edit `.env`

```env
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_wallet_private_key
```

### Step 2: Update `hardhat.config.js`

```js
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545"
    // },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  }
};
```

### Step 3: Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

You can verify the deployment address on:

🔗 [Sepolia Etherscan](https://sepolia.etherscan.io/)


---

## 📚 Learn More

* [Hardhat Docs](https://hardhat.org/)
* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
* [SPDX Licensing](https://spdx.org/licenses/)

---



## 👨‍💻 Author

**Vishal Mathuri**
(https://github.com/vishalmathuri)

---

## 🛡 License

MIT

```
