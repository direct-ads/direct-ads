async function main() {
  const DirectAds = await ethers.getContractFactory("DirectAds");
  const directAds = await DirectAds.deploy();
  await directAds.deployed();
  console.log("DirectAds deployed to:", directAds.address);
  console.log(`https://mumbai.polygonscan.com/address/${directAds.address}`);

  const tokens = [
    "https://ipfs.infura.io/ipfs/QmRmkCerpVgwA6RTjA7LhAGBN8XSVWxHsr3b5vZ9AHXWTi",
    "https://ipfs.infura.io/ipfs/QmRdCvssFGpLNbWCY7PJhP3d2rLXFjS9dzEb2sxSyzWhMk",
    "https://ipfs.infura.io/ipfs/QmcGS1MkjTT1r5pfV1TWaC9Lg1qvWino6yz3orobou5mXx",
    "https://ipfs.infura.io/ipfs/QmSmtgsyMv57jzNxZobb2RhMwQgHMcFPpEVymd7sUrrW73",
  ];

  // Add some test data
  for (let i = 0; i < tokens.length; i++) {
    const tokenURI = tokens[i];
    console.log("adding", tokenURI);
    await directAds._addInventory(tokenURI);
    for (let j = 0; j < 2; j++) {
      let bid = Math.floor(Math.random() * 1000);
      await directAds.addOffer(
        i+1,
        `https://example${j+1}.org/vast${bid}.xml`,
        bid,
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );
    }
  }
  try {
    await transferLinkTokens("0.05", directAds.address);
    await directAds.startDomainVerification("example.com", tokenURI);
  } catch (e) {
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
