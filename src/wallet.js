import { ethers } from "ethers";
import Onboard from "bnc-onboard";

export default async function () {
  const onboard = Onboard({
    dappId: "e1a1ff68-4c57-4d8a-a283-1ce8a9bd9fbf",
    networkId: 31337,
    subscriptions: {
      wallet: (wallet) => {
        window.localStorage.setItem("wallet", wallet.name);
        window.provider = new ethers.providers.Web3Provider(wallet.provider);
      },
    },
  });

  const walletName = window.localStorage.getItem("wallet");
  const walletSelected = await onboard.walletSelect(walletName);
  if (walletSelected) {
    // Run wallet checks to make sure that user is ready to transact
    await onboard.walletCheck();
    return window.provider;
  } else {
    console.error("TODO: Wallet was not selected");
  }
}
