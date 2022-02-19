// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DirectAds {
    struct Inventory {
        uint256 minCPM;
        string description;
        string url;
    }

    Inventory[] private _inventory;

    function inventory() public view returns (Inventory[] memory) {
        return _inventory;
    }

    function addInventory(uint256 minCPM, string memory description, string memory url) public {
        _inventory.push(Inventory(minCPM, description, url));
    }
}
