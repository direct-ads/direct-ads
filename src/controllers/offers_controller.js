import { ethers } from "ethers";
import { Controller } from "@hotwired/stimulus";
import directAds from "../direct_ads";

export default class extends Controller {
  static targets = ["form", "table", "template"];
  static values = { inventoryId: Number, loaded: Boolean };

  #directAds;
  #formatter;

  async initialize() {
    this.#directAds = await directAds();
    this.#directAds.on("NewOffer", async (inventoryId, offerIndex, event) => {
      inventoryId = ethers.BigNumber.from(inventoryId).toNumber();
      offerIndex = ethers.BigNumber.from(offerIndex).toNumber();
      const offer = await this.#directAds.offer(inventoryId, offerIndex);
      this.#appendOffer(offer, "highlight");
    });
    this.#formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  async index(event) {
    while (this.tableTarget.firstChild) {
      this.tableTarget.firstChild.remove();
    }

    if (!this.loadedValue) {
      for (let offer of await this.#directAds.offers(this.inventoryIdValue)) {
        this.#appendOffer(offer);
      }
    }

    this.loadedValue = !this.loadedValue;
  }

  #appendOffer(offer, cssClass) {
    const node = this.templateTarget.content.cloneNode(true);
    node.querySelector("th").textContent = offer.id;
    node.querySelectorAll("td")[0].textContent = this.#formatter.format(
      offer.bid / 100
    );
    node.querySelectorAll("td")[1].textContent = offer.url;
    this.tableTarget.appendChild(node);
    if (cssClass) {
      this.tableTarget.children[this.tableTarget.children.length-1].classList.add(cssClass)
    }
  }

  async create(event) {
    event.preventDefault();

    let formData = new FormData(this.formTarget);
    let inventoryId = this.inventoryIdValue;
    let url = formData.get("url");
    let bid = formData.get("bid");
    let payee = formData.get("payee");
    await this.#directAds.addOffer(inventoryId, url, bid, payee);

    console.log("Added a new offer for inventory", inventoryId);
  }
}
