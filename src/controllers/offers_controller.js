import { Controller } from "@hotwired/stimulus";
import directAds from "../direct_ads";

export default class extends Controller {
  static targets = ["form", "table", "template"];
  static values = { inventoryId: Number, loaded: Boolean };

  #directAds;
  #formatter;

  async initialize() {
    this.#formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    this.#directAds = await directAds();
  }

  async index(event) {
    while (this.tableTarget.firstChild) {
      this.tableTarget.firstChild.remove();
    }

    if (!this.loadedValue) {
      for (let offer of await this.#directAds.offers(this.inventoryIdValue)) {
        const tpl = this.templateTarget.content.cloneNode(true);
        tpl.querySelector("th").textContent = offer.id;
        tpl.querySelectorAll("td")[0].textContent = this.#formatter.format(
          offer.bid / 100
        );
        tpl.querySelectorAll("td")[1].textContent = offer.url;
        this.tableTarget.appendChild(tpl);
      }
    }

    this.loadedValue = !this.loadedValue;
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
