// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// To use ape, remove /contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract DirectAds is ERC721URIStorage, ChainlinkClient {
    using Counters for Counters.Counter;
    using Chainlink for Chainlink.Request;

    enum DomainStatus { Unverified, Pending, Verified }
    mapping(string => DomainStatus) private _domains;
    mapping(bytes32 => string) private _verificationRequests;

    Counters.Counter private _tokenIds;
    Counters.Counter private _offerIds;

    address private _oracle;
    bytes32 private _jobId;
    uint256 private _fee;

    struct Offer {
        uint256 id;
        string url;
        uint256 bid;
        address payee;
    }

    // Mapping from token ID to offers
    mapping(uint256 => Offer[]) private _offers;

    constructor() ERC721("DirectAds", "DA") {
        // setPublicChainlinkToken();
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        _oracle = 0xc8D925525CA8759812d0c299B90247917d4d4b7C;
        _jobId = "99b1b806a8f84b14a254230ccf094747";
        _fee = 0.01 * 10**18;
    }

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

    function addOffer(
        uint256 inventoryId,
        string memory url,
        uint256 bid,
        address payee
    ) public returns (uint256) {
        _offerIds.increment();

        uint256 id = _offerIds.current();
        _offers[inventoryId].push(Offer(id, url, bid, payee));

        return id;
    }

    function offers(uint256 inventoryId) public view returns (Offer[] memory) {
        return _offers[inventoryId];
    }

    function startDomainVerification(string memory domain) public returns (bytes32 requestId) {
        require(_domains[domain] != DomainStatus.Pending, "Verification is already in progress");

        _domains[domain] = DomainStatus.Pending;
        Chainlink.Request memory request = buildChainlinkRequest(
            _jobId,
            address(this),
            this.finishDomainVerification.selector
        );
        request.add(
            "get",
            string(abi.encodePacked("https://dns.google/resolve?type=txt&name=", domain))
        );
        request.add("path", "RD");
        requestId = sendChainlinkRequestTo(_oracle, request, _fee);
        _verificationRequests[requestId] = domain;
        return requestId;
    }

    function finishDomainVerification(bytes32 requestId_, bool success)
        public
        recordChainlinkFulfillment(requestId_)
    {
        string memory domain = _verificationRequests[requestId_];
        require(_domains[domain] == DomainStatus.Pending, "Failed");

        if (success) {
            _domains[domain] = DomainStatus.Verified;
        } else {
            delete _domains[domain];
        }

        delete _verificationRequests[requestId_];
    }

    function domainStatus(string memory domain) public view returns (DomainStatus) {
        return _domains[domain];
    }
}
