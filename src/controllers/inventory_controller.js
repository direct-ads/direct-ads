import { Controller } from "@hotwired/stimulus";
import { ethers } from "ethers";
import DirectAds from "../../artifacts/contracts/DirectAds.sol/DirectAds.json";

export default class extends Controller {
  static targets = ["content", "inventoryForm", "offerForm"];
  static values = { inventoryId: String };

  get directAds() {
    return new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      DirectAds.abi,
      window.provider.getSigner()
    );
  }

  async connect() {
    let totalSupply = await this.directAds.totalSupply();

    for (let id = totalSupply; id >= 1; id--) {
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
    // Add a new offer form
    let response = await fetch("_new_offer.html");
    this.contentTarget.insertAdjacentHTML("beforeend", await response.text());
  }

  renderOffers(offers) {
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    let rows = "";
    for (let offer of offers) {
      rows += `<tr><th scope="row">${offer.id}</th><td>${formatter.format(
        offer.bid / 100
      )}</td><td><code>${offer.url}</code></td></tr>`;
    }
    return `<table class="table"><thead><tr><th scope="col">id</th><th scope="col">bid</th><th scope="col">url</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  async newInventory() {
    let response = await fetch("_new_inventory.html");
    this.contentTarget.innerHTML = await response.text();
  }

  async addInventory() {
    // Store the metadata on IPFS
    let formData = new FormData(this.inventoryFormTarget);
    let inventoryJSON = JSON.stringify(Object.fromEntries(formData));
    let file = new FormData();
    file.append("file", inventoryJSON);
    let response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
      method: "POST",
      body: file
    });
    let json = await response.json();
    let tokenURI = "https://ipfs.infura.io/ipfs/" + json["Hash"];
    // Add the new inventory
    let tokenId = await this.directAds.addInventory(tokenURI);
    console.log("New NFT", tokenId);
  }

  async addOffer() {
    let formData = new FormData(this.offerFormTarget);
    // Add the new offer
    let url = formData.get("url");
    let bid = formData.get("bid");
    let payee = formData.get("payee");
    let offerId = await this.directAds.addOffer(1, url, bid, payee);
    console.log("New offer", offerId);
  }
}
