// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// To use hardhat, insert /contracts after @openzeppelin.
// To use ape, remove /contracts.
import "@openzeppelin/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/utils/Counters.sol";

contract DirectAds is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DirectAds", "DA") {}

    function addInventory(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newInventoryId = _tokenIds.current();
        _mint(msg.sender, newInventoryId);
        _setTokenURI(newInventoryId, tokenURI);

        return newInventoryId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
