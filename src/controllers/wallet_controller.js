import { Controller } from "@hotwired/stimulus";
import { ethers } from "ethers";
import Onboard from "bnc-onboard";

export default class extends Controller {
  static targets = ["status"];

  async connect() {
    const onboard = Onboard({
      dappId: "e1a1ff68-4c57-4d8a-a283-1ce8a9bd9fbf",
      networkId: 4,
      subscriptions: {
        wallet: async (wallet) => {
          // Store the selected wallet name to be retrieved next time the app loads
          window.localStorage.setItem("selectedWallet", wallet.name);
          const provider = new ethers.providers.Web3Provider(wallet.provider);
          const signer = provider.getSigner();
          const addr = await signer.getAddress();
          let balance = await provider.getBalance(addr);
          this.statusTarget.value = `Connected to ${wallet.name}`;
          console.log(addr, balance);
        }
      }
    });

    // Get the selected wallet from local storage
    const previouslySelectedWallet = window.localStorage.getItem("selectedWallet");
    if (previouslySelectedWallet === null) {
      // Prompt user to select a wallet
      await onboard.walletSelect();
    } else {
      await onboard.walletSelect(previouslySelectedWallet);
    }
    // Run wallet checks to make sure that user is ready to transact
    await onboard.walletCheck();
  }
}
