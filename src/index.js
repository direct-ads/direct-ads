import "bootstrap/dist/css/bootstrap.min.css";
import { Application } from "@hotwired/stimulus";
import WalletController from "./controllers/wallet_controller";

window.Stimulus = Application.start();
Stimulus.register("wallet", WalletController);
