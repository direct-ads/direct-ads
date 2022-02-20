async function main() {
  const DirectAds = await ethers.getContractFactory("DirectAds");
  const directAds = await DirectAds.deploy();
  await directAds.deployed();

  // Add some test data for demo purposes
  for (let i = 0; i < 10; i++) {
    await directAds.addInventory(
      "https://bafybeiffh63tssd26veaws7wxzxp2taik2hjp27ktgtz26oqxh5wuyvfse.ipfs.infura-ipfs.io"
    );
  }
  for (let i = 0; i < 3; i++) {
    await directAds.addOffer(1, "https://example.org/vast.xml", 500, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  }

  console.log("DirectAds deployed to:", directAds.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
