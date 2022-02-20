require("@nomiclabs/hardhat-ethers");

const fs = require("fs");
const privateKey = fs
  .readFileSync(".secret")
  .toString()
  .trim();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com/v1/7a72ff82afc9b4434a6796571d5c38cdf0f8a853",
      accounts: [privateKey]
    }
  },
  solidity: "0.8.9"
};
