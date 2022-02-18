import { ethers } from "ethers";

import Onboard from "bnc-onboard";

const onboard = Onboard({
  dappId: "e1a1ff68-4c57-4d8a-a283-1ce8a9bd9fbf",
  networkId: 4,
  subscriptions: {
    wallet: (wallet) => {
      console.log(wallet);
      const provider = new ethers.providers.Web3Provider(wallet.provider);
    }
  }
});

// Prompt user to select a wallet
await onboard.walletSelect();
// Run wallet checks to make sure that user is ready to transact
await onboard.walletCheck();
