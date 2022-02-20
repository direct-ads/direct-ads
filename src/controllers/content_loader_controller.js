import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["content"];
  static values = { url: String };

  async load({ params: { url } }) {
    let response = await fetch(url);
    this.contentTarget.innerHTML = await response.text();
  }
}
