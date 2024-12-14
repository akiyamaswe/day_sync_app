// app/javascript/controllers/side_menu_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "toggle"];

  connect() {
    document.addEventListener("click", this.handleClickOutside.bind(this));
  }

  disconnect() {
    document.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  toggle() {
    this.menuTarget.classList.toggle(this.menuTarget.dataset.sideMenuOpenClass);
  }

  handleClickOutside(event) {
    if (
      !this.menuTarget.contains(event.target) &&
      !this.toggleTarget.contains(event.target) &&
      this.menuTarget.classList.contains(
        this.menuTarget.dataset.sideMenuOpenClass
      )
    ) {
      this.toggle();
    }
  }
}
