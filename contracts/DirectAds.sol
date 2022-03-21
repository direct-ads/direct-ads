// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// To use ape, remove /contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract DirectAds is ERC721URIStorage, ChainlinkClient {
    using Counters for Counters.Counter;
    using Chainlink for Chainlink.Request;

    enum DomainStatus {
        Unverified,
        Pending,
        Verified
    }
    mapping(string => DomainStatus) private _domainStatus;
    mapping(bytes32 => string) private _domainRequest;
    mapping(string => string) private _domainTokenURI;

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

    event NewInventory(uint256 indexed id);
    event NewOffer(uint256 indexed inventoryId, uint256 offerIndex);
    event DomainVerificationResult(string indexed domain, bool result);

    constructor() ERC721("DirectAds", "DA") {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        _oracle = 0xc8D925525CA8759812d0c299B90247917d4d4b7C;
        _jobId = "99b1b806a8f84b14a254230ccf094747";
        _fee = 0.01 * 10**18;
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

        uint256 offerIndex = _offers[inventoryId].length - 1;
        emit NewOffer(inventoryId, offerIndex);

        return id;
    }

    function offers(uint256 inventoryId) public view returns (Offer[] memory) {
        return _offers[inventoryId];
    }

    function offer(uint256 inventoryId, uint256 offerIndex)
        public
        view
        returns (Offer memory)
    {
        return _offers[inventoryId][offerIndex];
    }

    function startDomainVerification(
        string memory domain,
        string memory tokenURI
    ) public returns (bytes32 requestId) {
        require(
            _domainStatus[domain] != DomainStatus.Pending,
            "Verification is already in progress"
        );

        _domainStatus[domain] = DomainStatus.Pending;
        _domainTokenURI[domain] = tokenURI;

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
        _domainRequest[requestId] = domain;
        return requestId;
    }

    function finishDomainVerification(bytes32 requestId, bool success)
        public
        recordChainlinkFulfillment(requestId)
    {
        string memory domain = _domainRequest[requestId];
        require(_domainStatus[domain] == DomainStatus.Pending, "Failed");

        if (success) {
            _domainStatus[domain] = DomainStatus.Verified;
            _addInventory(_domainTokenURI[domain]);
        } else {
            delete _domainStatus[domain];
        }

        delete _domainTokenURI[domain];
        delete _domainRequest[requestId];

        emit DomainVerificationResult(domain, success);
    }

    function _addInventory(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);
        _setTokenURI(id, tokenURI);

        emit NewInventory(id);

        return id;
    }

    function domainStatus(string memory domain)
        public
        view
        returns (DomainStatus)
    {
        return _domainStatus[domain];
    }
}
