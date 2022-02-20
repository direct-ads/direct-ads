// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// To use hardhat, insert /contracts after @openzeppelin.
// To use ape, remove /contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DirectAds is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _offerIds;

    struct Offer {
        uint256 id;
        string url;
        uint256 bid;
        address payee;
    }

    // Mapping from token ID to offers
    mapping(uint256 => Offer[]) private _offers;

    constructor() ERC721("DirectAds", "DA") {}

    function addInventory(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);
        _setTokenURI(id, tokenURI);

        return id;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function addOffer(uint256 inventoryId, string memory url, uint256 bid, address payee) public returns (uint256) {
        _offerIds.increment();

        uint256 id = _offerIds.current();
        _offers[inventoryId].push(Offer(id, url, bid, payee));

        return id;
    }

    function offers(uint256 inventoryId) public view returns (Offer[] memory) {
        return _offers[inventoryId];
    }
}
