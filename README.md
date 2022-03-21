# direct ads

This dapp allows publishers and advertisers to transact directly, without a
middleman (e.g. Google AdSense).

- Publishers add their unique inventory (e.g. a pre-roll ad space in a video)
  by minting an NFT.
- Advertisers make bids on the inventory they are interested in.
- Publishers accept offers, display ads, and get paid directly by advertisers.
- The whole process is managed by a few smart contracts on the Ethereum
  blockchain.

Video: https://ipfs.infura.io/ipfs/QmfHQiYUMmXSevfJYgkcD4riGPZQKyrWdftEt1aSNRxZNa

Demo: https://direct-ads.pages.dev/

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

- Chainlink

  Our dapp uses Chainlink to verify domain name ownership. An owner needs to
  add a TXT verification record, which the contract checks using Chainlink Any
  API. The relevant lines are highlighted here:
  https://github.com/direct-ads/direct-ads/blob/main/contracts/DirectAds.sol#L83-L128

  <img width="800" alt="image" src="https://ipfs.infura.io/ipfs/QmepWa2VAHRtxAxWWXnPqLBXjYTovV9N7FRgKzWoM2751H">

- Polygon

  Our dapp is based on NFTs and deployed on Polygon Testnet.
  https://mumbai.polygonscan.com/address/0x8e89837992D8a8bfBB2545059A64Eb557951c657

- Consensys Devtools

  We've written Scribble properties for the OpenZeppelin ERC777 contract. Please
  see https://github.com/soylent/openzeppelin-contracts/commit/2490c2a336db29a0d12bd62493031139e2ce1226

* Apeworx

  We used Ape to build and test the smart contracts for our dapp.

  https://github.com/direct-ads/direct-ads/blob/main/ape-config.yaml

- Tally Wallet

  We've integrated Tally Wallet into our app using the Blocknative Onboard
  library.

  <img width="600" alt="image" src="https://ipfs.infura.io/ipfs/QmYfsQ6aEdYrWw1bVkPzZB5ocK22kaz4K3ovjcefacx5ri">

## Our tech stack

|              |                                                      |
| ------------ | ---------------------------------------------------- |
| apeworx      | Contract development framework                       |
| bnc-onboard  | Wallet selection                                     |
| bootstrap 5  | CSS framework                                        |
| chainlink    | Domain name ownership verification
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
1. Start webpack dev server and hardhat node
   ```sh
   npm start
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
