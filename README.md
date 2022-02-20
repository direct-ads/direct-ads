# direct ads

This dapp allows publishers and advertisers to transact directly, without a
middleman (e.g. Google AdSense).

* Publishers add their unique inventory (e.g. a pre-roll ad space in a video)
  by minting an NFT.
* Advertisers make bids on the inventory they are interested in.
* Publishers accept offers, display ads, and get paid directly by advertisers.
* The whole process is managed by a few smart contracts on the Ethereum
  blockchain.

THIS IS A WORK IN PROGRESS.

## Our tech stack

|||
|---|---|
| apeworx | Contract development framework |
| bnc-onboard | Wallet selection |
| bootstrap 5 | CSS framework |
| ethers.js | Library for interacting with the Ethereum Blockchain |
| maticvigil | API gateway for the matic network |
| openzepellin | Reusable solidity contracts |
| polygon | EVM enabled sidechain |
| solidity | Our contracts are written in solidity |
| stimulus | Frontend JS framework |
| tally wallet | Our dapp supports tally wallet via bnc-onboard |


## Development

1. Install dependencies
   ```sh
   npm install
   ```
1. Start foreman. (Run `gem install foreman` to install it first.)
   ```sh
   foreman start
   ```
1. Run tests. (Run `pip install eth-ape` to install `ape`.)
   ```sh
   ape test
   ```
1. Open http://localhost:8080

To deploy the contracts, execute:
```sh
ape run deploy --network <network>
```
