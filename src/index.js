import "bootstrap/dist/css/bootstrap.min.css";
import { Application } from "@hotwired/stimulus";
import WalletController from "./controllers/wallet_controller";
import InventoryController from "./controllers/inventory_controller";
import ContentLoaderController from "./controllers/content_loader_controller";

window.Stimulus = Application.start();
Stimulus.register("wallet", WalletController);
Stimulus.register("inventory", InventoryController);
Stimulus.register("content-loader", ContentLoaderController);
