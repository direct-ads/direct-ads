import { ethers } from "ethers";
import getProvider from "./wallet";
import DirectAds from "../artifacts/contracts/DirectAds.sol/DirectAds.json";

let directAds = null;

export default async function() {
  if (directAds == null) {
    const provider = await getProvider();
    directAds = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      DirectAds.abi,
      provider.getSigner()
    );
  }

  return directAds;
}
