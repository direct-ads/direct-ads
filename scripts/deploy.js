async function main() {
  const DirectAds = await ethers.getContractFactory("DirectAds");
  const directAds = await DirectAds.deploy();
  await directAds.deployed();

  // Add some test data for demo purposes
  for (let i = 0; i < 4; i++) {
    await directAds.addInventory(
      "https://ipfs.infura.io/ipfs/QmcZfEzDizzLpSP2erfFXjfbgLhomWxStfjq9xtmza9cRr"
    );
    for (let j = 0; j < 2; j++) {
      await directAds.addOffer(
        i,
        "https://example.org/vast.xml",
        500,
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );
    }
  }

  console.log("DirectAds deployed to:", directAds.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
