# direct ads

This dapp allows publishers and advertisers to transact directly, without a
middleman (e.g. Google AdSense).

- Publishers add their unique inventory (e.g. a pre-roll ad space in a video)
  by minting an NFT.
- Advertisers make bids on the inventory they are interested in.
- Publishers accept offers, display ads, and get paid directly by advertisers.
- The whole process is managed by a few smart contracts on the Ethereum
  blockchain.

THIS IS A WORK IN PROGRESS.

## FAQ

- **Q**: Why use NFTs?

  **A**: Publishers often monetize their content (inventory) with ads. Since the
  content is unique and belongs to someone, NFTs can be used to represent it.
  For example, a blog, a news website, or a video channel can be represented
  with an NFT, and the ownership can be verified.

- **Q**: How would you deal with unscrupulous advertisers who don't pay?

  **A**: A publisher can receive bids from several advertisers, and some of the
  bids might be bogus, which means that the publisher needs to be careful and
  select ads that maximize the profit. We can think of each advertiser as a
  Bernoulli bandit, i.e. it generates ad revenue with some probability. There is
  a simple and efficient algorithm to solve this problem - Thompson sampling.
  Please see https://web.stanford.edu/~bvr/pubs/TS_Tutorial.pdf

## Bounties

* Polygon

  Our dapp is based on NFTs and deployed on Polygon Testnet.
  https://mumbai.polygonscan.com/address/0x9a3d3145Dd33eB4fF97bC5fd1E632aB3A0Cc4960

* Consensys Devtools

  We've written Scribble properties for the OpenZeppelin ERC777 contract. Please
  see https://github.com/soylent/openzeppelin-contracts/commit/2490c2a336db29a0d12bd62493031139e2ce1226

* Tally Wallet

  We've integrated Tally Wallet into our app using the Blocknative Onboard
  library.
  
  <img width="657" alt="image" src="https://user-images.githubusercontent.com/1593860/154835421-31c26b62-12cd-44f6-9b73-9077aa44e32b.png">


* Apeworx

  We used Ape to build and test the smart contracts for our dapp.

## Our tech stack

|              |                                                      |
| ------------ | ---------------------------------------------------- |
| apeworx      | Contract development framework                       |
| bnc-onboard  | Wallet selection                                     |
| bootstrap 5  | CSS framework                                        |
| ethers.js    | Library for interacting with the Ethereum Blockchain |
| maticvigil   | API gateway for the matic network                    |
| openzepellin | Reusable solidity contracts                          |
| polygon      | EVM enabled sidechain                                |
| solidity     | Our contracts are written in solidity                |
| stimulus     | Frontend JS framework                                |
| tally wallet | Our dapp supports tally wallet via bnc-onboard       |

## Development

1. Install foreman
   ```sh
   gem install foreman
   ```
1. Install apeworx
   ```sh
   pip install eth-ape
   ```
1. Install dependencies
   ```sh
   npm install
   ```
1. Start foreman
   ```sh
   foreman start
   ```
1. Run tests
   ```sh
   ape test
   ```
1. Deploy the contracts
   ```sh
   ape run deploy --network hardhat
   ```
1. Open http://localhost:8080
