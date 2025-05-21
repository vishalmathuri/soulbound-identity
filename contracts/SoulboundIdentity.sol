// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

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

    constructor() ERC721("SoulboundIdentity", "SBT") Ownable(msg.sender) {}

    function mintSBT(
        address to,
        string memory name,
        uint256 uniqueId,
        string memory metadata
    ) public onlyOwner {
        require(!hasSBT[to], "User already has an SBT");

        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);

        _sbtDetails[tokenId] = SBTData(name, uniqueId, metadata, false);
        hasSBT[to] = true;
        _tokenIdCounter++;
    }

    function revokeSBT(uint256 tokenId) external onlyOwner {
        require(_isTokenExists(tokenId), "Token does not exist");
        _sbtDetails[tokenId].isRevoked = true;
    }

    function getSBTDetails(uint256 tokenId)
        external
        view
        returns (
            string memory name,
            uint256 uniqueId,
            string memory metadata,
            bool isRevoked
        )
    {
        require(_isTokenExists(tokenId), "Token does not exist");
        SBTData memory data = _sbtDetails[tokenId];
        return (data.name, data.uniqueId, data.metadata, data.isRevoked);
    }

    // New transfer prevention logic for OpenZeppelin v5.x
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from;
        try this.ownerOf(tokenId) returns (address owner) {
            from = owner;
        } catch {
            from = address(0); // Minting case
        }

        require(
            from == address(0) || to == address(0),
            "Soulbound tokens are non-transferable"
        );

        return super._update(to, tokenId, auth);
    } 

    function approve(address, uint256) public pure override {
        revert("Soulbound tokens cannot be approved");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound tokens cannot be approved");
    }

    function _isTokenExists(uint256 tokenId) internal view returns (bool) {
        try this.ownerOf(tokenId) returns (address) {
            return true;
        } catch {
            return false;
        }
    }
}
