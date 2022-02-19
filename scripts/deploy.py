from ape import accounts, project

acc = accounts.load("local")
direct_ads = acc.deploy(project.DirectAds)
for _ in range(10):
    direct_ads.addInventory("https://example.org/metadata.json", sender=acc)
