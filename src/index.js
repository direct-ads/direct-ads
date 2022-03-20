import "./index.scss";
import { Collapse } from "bootstrap";
import { Application } from "@hotwired/stimulus";
import InventoryController from "./controllers/inventory_controller";
import OffersController from "./controllers/offers_controller";

window.Stimulus = Application.start();
Stimulus.register("inventory", InventoryController);
Stimulus.register("offers", OffersController);
