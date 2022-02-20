import pytest
from collections import namedtuple


@pytest.fixture
def owner(accounts):
    return accounts[0]


@pytest.fixture
def direct_ads(project, owner):
    return owner.deploy(project.DirectAds)


Inventory = namedtuple("Inventory", ["id", "token_uri"])


@pytest.fixture
def inventory(direct_ads, owner):
    token_uri = "https://example.org/metadata.json"
    receipt = direct_ads.addInventory(token_uri, sender=owner)
    receipt.raise_for_status()
    return Inventory(id=direct_ads.totalSupply(), token_uri=token_uri)
