from ape import accounts, project

acc = accounts.load("local")
direct_ads = acc.deploy(project.DirectAds)

# Add some test data for demo purposes
for _ in range(4):
    direct_ads.addInventory(
        "https://ipfs.infura.io/ipfs/QmcZfEzDizzLpSP2erfFXjfbgLhomWxStfjq9xtmza9cRr",
        sender=acc,
    )


def cli():
    pass
