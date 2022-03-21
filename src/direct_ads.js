import { ethers } from "ethers";
import getProvider from "./wallet";
import DirectAds from "../artifacts/contracts/DirectAds.sol/DirectAds.json";

let directAds = null;

export default async function() {
  if (directAds == null) {
    const provider = await getProvider();
    directAds = new ethers.Contract(
      "0x8e89837992D8a8bfBB2545059A64Eb557951c657",
      DirectAds.abi,
      provider.getSigner()
    );
  }

  return directAds;
}
