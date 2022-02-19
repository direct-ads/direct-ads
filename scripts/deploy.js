async function main() {
  const DirectAds = await ethers.getContractFactory("DirectAds");
  console.log("Deploying DirectAds...");
  const directAds = await DirectAds.deploy();
  await directAds.deployed();
  console.log("DirectAds deployed to:", directAds.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
