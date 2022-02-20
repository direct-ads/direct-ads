from ape import accounts, project

acc = accounts.load("local")
direct_ads = acc.deploy(project.DirectAds)

# Add some test data for demo purposes
for _ in range(10):
    direct_ads.addInventory(
        "https://bafybeiffh63tssd26veaws7wxzxp2taik2hjp27ktgtz26oqxh5wuyvfse.ipfs.infura-ipfs.io",
        sender=acc,
    )


def cli():
    pass
