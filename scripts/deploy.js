async function main() {
  const DirectAds = await ethers.getContractFactory("DirectAds");
  const directAds = await DirectAds.deploy();
  await directAds.deployed();
  console.log("DirectAds deployed to:", directAds.address);
  console.log(`https://mumbai.polygonscan.com/address/${directAds.address}`);

  // Add some test data for demo purposes
  for (let i = 1; i < 5; i++) {
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
  try {
    await transferLinkTokens("0.05", directAds.address);
    await directAds.startDomainVerification("example.com");
  } catch(e) {
    console.error(e);
  }
  console.log("Seeding complete");
}

async function transferLinkTokens(amount, target) {
  // ChainLink Token
  var contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  var contractAbiFragment = [
    {
      name: "transfer",
      type: "function",
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          type: "uint256",
          name: "_value",
        },
      ],
      constant: false,
      outputs: [],
      payable: false,
    },
  ];
  const signer = await ethers.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    contractAbiFragment,
    signer
  );
  const numberOfTokens = ethers.utils.parseUnits(amount, 18);
  await contract.transfer(target, numberOfTokens);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
