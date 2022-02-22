import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["target"];

  toggle(event) {
    event.preventDefault();

    this.targetTarget.classList.toggle("d-none");
  }
}
