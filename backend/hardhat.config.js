require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat:{},
    mumbai: {
      url: RPC_URL,
      chainID: 80001,
      account: [PRIVATE_KEY]
    },
  },
  solidity: {
    version: "0.8.24"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  }
};

// https://mrinnnmoy.hashnode.dev/how-to-integrate-smart-contract-with-frontend

// npx hardhat run scripts/deploy.js --network mumbai