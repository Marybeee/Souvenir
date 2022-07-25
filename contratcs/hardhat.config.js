require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { API_URL_POLYGON, PRIVATE_KEY, API_URL_ETHERSCAN } = process.env; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    polygonMumbai: {
      url: API_URL_POLYGON,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: API_URL_ETHERSCAN,
  }
};
