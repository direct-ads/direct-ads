import "./index.scss";
import { Application } from "@hotwired/stimulus";
import InventoryController from "./controllers/inventory_controller";
import OffersController from "./controllers/offers_controller";
import TogglerController from "./controllers/toggler_controller";

window.Stimulus = Application.start();
Stimulus.register("inventory", InventoryController);
Stimulus.register("offers", OffersController);
Stimulus.register("toggler", TogglerController);
