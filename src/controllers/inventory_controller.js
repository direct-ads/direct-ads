import { Controller } from "@hotwired/stimulus";
import { ethers } from "ethers";
import DirectAds from "../../artifacts/contracts/DirectAds.sol/DirectAds.json";

export default class extends Controller {
  static targets = ["content"];
  static values = { inventoryId: String };

  get directAds() {
    return new ethers.Contract(
      "0x998abeb3E57409262aE5b751f60747921B33613E",
      DirectAds.abi,
      window.provider.getSigner()
    );
  }

  async connect() {
    let totalSupply = await this.directAds.totalSupply();

    for (let id = 1; id <= totalSupply; id++) {
      let inventory = await this.loadInventory(id);
      this.contentTarget.insertAdjacentHTML(
        "beforeend",
        this.renderInventory(inventory)
      );
    }
  }

  async loadInventory(id) {
    let tokenURI = await this.directAds.tokenURI(id);
    let inventoryResponse = await fetch(tokenURI);
    let inventory = await inventoryResponse.json();
    inventory.id = 1; // FIXME
    return inventory;
  }

  renderInventory(inventory) {
    return `<div class="row"><div class="col-3"><img src="${
      inventory.thumbnail
    }" class="img-thumbnail" /></div><div class="col-6"><a href="#" data-inventory-inventory-id-param="${
      inventory.id
    }" data-action="inventory#load" class="h6">${inventory.name}</a><p>${
      inventory.description
    }</p></div></div>`;
  }

  async load({ params: { inventoryId } }) {
    let inventory = await this.loadInventory(inventoryId);
    this.contentTarget.innerHTML = this.renderInventory(inventory);
    this.contentTarget.insertAdjacentHTML("beforeend", "<h3>offers</h3>");
    // Load existing offers
    this.contentTarget.insertAdjacentHTML(
      "beforeend",
      this.renderOffers(await this.directAds.offers(inventoryId))
    );
  }

  renderOffers(offers) {
    let rows = "";
    for (let offer of offers) {
      rows += `<tr><th scope="row">${offer.id}</th><td>${
        offer.bid
      }</td><td><code>${offer.url}</code></td></tr>`;
    }
    return `<table class="table"><thead><tr><th scope="col">id</th><th scope="col">bid</th><th scope="col">url</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
}
