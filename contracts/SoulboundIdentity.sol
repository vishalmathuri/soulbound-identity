// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundIdentity is ERC721, Ownable {

    uint256 private _tokenIdCounter;

    struct SBTData {
        string name;
        uint256 uniqueId;
        string metadata;
        bool isRevoked;
    }

        mapping(uint256 => SBTData) private _sbtDetails;
        mapping(address => bool) public hasSBT;

    constructor() ERC721("SoulboundIdentity", "SBT") {}

    function mintSBT(address to, string memory name, uint256 uniqueId, string memory metadata) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);

        _sbtDetails[tokenId] = SBTData(name, uniqueId, metadata, false);
        hasSBT[to]=true;
        _tokenIdCounter++;
    
    }

    function revokeSBT(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId),"Token does not exist");
        _sbtDetails[tokenId].isRevoked = true;
    }

    function getSBTDetails(uint256 tokenId) external view returns(
        string memory name,
        uint256 uniqueId,
        string memory metadata,
        bool isRevoked){
            require(_exists(tokenId),"Token does not exist");
            SBTData memory data = _sbtDetails[tokenId];
            return (data.name, data.uniqueId, data.metadata, data.isRevoked);
        }

    function _transfer(address from, address to, uint256 tokenId) internal pure override {
        revert("Soulbound tokens are non-transferable");

    }

    function approve(address to, uint256 tokenId) public pure override{
        revert("Soulbound token cannot be approve");
    }

    function setApprovalForAll(address operator, bool approved) public pure override {
        revert("Soulbound tokens cannot be approved");
    }

}