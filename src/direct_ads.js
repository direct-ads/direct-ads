import { ethers } from "ethers";
import getProvider from "./wallet";
import DirectAds from "../artifacts/contracts/DirectAds.sol/DirectAds.json";

let directAds = null;

export default async function() {
  if (directAds == null) {
    const provider = await getProvider();
    directAds = new ethers.Contract(
      "0x8071E429C7684fCe0250287F1578397142503241",
      DirectAds.abi,
      provider.getSigner()
    );
  }

  return directAds;
}
