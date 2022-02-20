def test_no_inventory(direct_ads):
    assert direct_ads.totalSupply() == 0


def test_new_inventory(direct_ads, owner, inventory):
    assert direct_ads.totalSupply() == 1
    assert direct_ads.tokenURI(inventory.id) == inventory.token_uri


def test_new_offer(direct_ads, owner, inventory):
    receipt = direct_ads.addOffer(
        inventory.id,
        "https://example.org",  # url
        500,  # bid
        "0x274b028b03A250cA03644E6c578D81f019eE1323",  # payee
        sender=owner,
    )
    receipt.raise_for_status()

    # XXX: apeworx fails when the contract returns a struct
    # offers = direct_ads.offers(inventory.id)
    # assert offers
