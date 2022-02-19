import pytest


@pytest.fixture
def owner(accounts):
    return accounts[0]


@pytest.fixture
def direct_ads(project, owner):
    return owner.deploy(project.DirectAds)
