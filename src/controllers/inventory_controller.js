import { Controller } from "@hotwired/stimulus";
import directAds from "../direct_ads";

export default class extends Controller {
  static targets = ["template", "form"];

  #directAds;

  async connect() {
    this.#directAds = await directAds();
    let totalSupply = await this.#directAds.totalSupply();

    for (let id = totalSupply; id >= 1; id--) {
      this.#appendInventory(await this.#loadInventory(id));
    }
  }

  async #loadInventory(id) {
    let tokenURI = await this.#directAds.tokenURI(id);
    let inventoryResponse = await fetch(tokenURI);
    let inventory = await inventoryResponse.json();
    inventory.id = id;
    return inventory;
  }

  #appendInventory(inventory) {
    const tpl = this.templateTarget.content.cloneNode(true);
    const link = tpl.querySelector("a");
    const collapseId = `inventory-${inventory.id}`;
    link.textContent = inventory.name;
    link.href = "#" + collapseId;
    tpl.querySelector("[class=collapse]").id = collapseId;
    tpl.querySelector("p").textContent = inventory.description;
    tpl.querySelector("img").src = inventory.thumbnail;
    tpl
      .querySelector("[data-controller=offers]")
      .setAttribute("data-offers-inventory-id-value", inventory.id);
    this.element.appendChild(tpl);
  }

  async create(event) {
    event.preventDefault();

    let formData = new FormData(this.formTarget);
    let inventoryJSON = JSON.stringify(Object.fromEntries(formData));
    let tokenURI = this.#storeJSON(inventoryJSON);
    await this.#directAds.addInventory(tokenURI);

    console.log("Minted a new inventory NFT");
  }

  async #storeJSON(json) {
    let file = new FormData();
    file.append("file", json);
    let response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
      method: "POST",
      body: file,
    });
    let responseJSON = await response.json();
    return "https://ipfs.infura.io/ipfs/" + responseJSON["Hash"];
  }
}
