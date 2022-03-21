import { ethers } from "ethers";
import { Controller } from "@hotwired/stimulus";
import directAds from "../direct_ads";

export default class extends Controller {
  static targets = ["form", "list", "template"];

  #directAds;

  async connect() {
    this.#directAds = await directAds();
    this.#directAds.on("NewInventory", async (id, event) => {
      id = ethers.BigNumber.from(id).toNumber();
      const inventoryNode = this.#buildInventoryNode(
        await this.#loadInventory(id)
      );
      this.listTarget.prepend(inventoryNode);
      this.listTarget.children[0].classList.add("highlight");
    });
    let totalSupply = await this.#directAds.totalSupply();

    for (let id = totalSupply; id >= 1; id--) {
      const inventoryNode = this.#buildInventoryNode(
        await this.#loadInventory(id)
      );
      this.listTarget.append(inventoryNode);
    }
  }

  async #loadInventory(id) {
    let tokenURI = await this.#directAds.tokenURI(id);
    let inventoryResponse = await fetch(tokenURI);
    let inventory = await inventoryResponse.json();
    inventory.id = id;
    return inventory;
  }

  #buildInventoryNode(inventory) {
    const node = this.templateTarget.content.cloneNode(true);
    const link = node.querySelector("a");
    const collapseId = `inventory-${inventory.id}`;
    link.textContent = inventory.name;
    link.href = "#" + collapseId;
    node.querySelector("[class=collapse]").id = collapseId;
    node.querySelector("p").textContent = inventory.description;
    node.querySelector("img").src = inventory.thumbnail;
    node
      .querySelector("[data-controller=offers]")
      .setAttribute("data-offers-inventory-id-value", inventory.id);
    return node;
  }

  async create(event) {
    event.preventDefault();

    const formData = new FormData(this.formTarget);
    const inventoryJSON = JSON.stringify(Object.fromEntries(formData));
    const tokenURI = this.#storeJSON(inventoryJSON);
    const url = new URL(this.formTarget["url"].value);
    await this.#directAds.startDomainVerification(url.host, tokenURI);

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
