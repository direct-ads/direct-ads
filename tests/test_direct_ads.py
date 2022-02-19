def test_no_inventory(direct_ads):
    assert direct_ads.totalSupply() == 0


def test_new_inventory(direct_ads, owner):
    token_uri = "https://example.org/metadata.json"
    receipt = direct_ads.addInventory(token_uri, sender=owner)
    receipt.raise_for_status()

    assert direct_ads.totalSupply() == 1
    assert direct_ads.tokenURI(1) == token_uri
