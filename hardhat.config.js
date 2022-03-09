require("@nomiclabs/hardhat-ethers");

let accounts = [];
if (process.env.PRIVATE_KEY) {
  accounts.push(process.env.PRIVATE_KEY);
}
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      },
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com/v1/7a72ff82afc9b4434a6796571d5c38cdf0f8a853",
      accounts: accounts,
    },
  },
  solidity: "0.8.6",
};
