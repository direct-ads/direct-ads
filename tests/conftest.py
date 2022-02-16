import pytest


@pytest.fixture
def owner(accounts):
    return accounts[0]


@pytest.fixture
def box(project, owner):
    return owner.deploy(project.Box)
