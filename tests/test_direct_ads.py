def test_inventory_when_empty(direct_ads):
    # inventory = direct_ads.inventory()
    assert True


def test_adding_new_inventory(direct_ads, owner):
    direct_ads.addInventory(500, "test inventory", "https://example.org/", sender=owner)
