import { Controller } from "@hotwired/stimulus";
import { ethers } from "ethers";
import Onboard from "bnc-onboard";

export default class extends Controller {
  static targets = ["status", "content"];

  async connect() {
    const onboard = Onboard({
      dappId: "e1a1ff68-4c57-4d8a-a283-1ce8a9bd9fbf",
      networkId: 1337, // 4,
      subscriptions: {
        wallet: async (wallet) => {
          // Store the selected wallet name to be retrieved next time the app loads
          window.localStorage.setItem("selectedWallet", wallet.name);
          window.provider = new ethers.providers.Web3Provider(wallet.provider);

          this.statusTarget.innerHTML = `Connected to ${wallet.name}`;

          let response = await fetch("_inventory.html");
          this.contentTarget.innerHTML = await response.text();
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
