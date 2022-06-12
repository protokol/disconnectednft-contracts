// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Disconnected is ERC721, Ownable {
    string public contractURI;
    string public baseURI;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory contractURI_,
        string memory baseURI_,
        address recipient_,
        uint256 tokenId_
    ) ERC721(name_, symbol_) {
        contractURI = contractURI_;
        baseURI = baseURI_;
        _safeMint(recipient_, tokenId_); /* Mint one NFT when contract deploys */
    }

    /// @notice Set new base URI
    /// @param baseURI_ String, in this case just for one nft
    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    /// @notice Set new contract metadata URI
    /// @param contractURI_ Contract metadata json
    function setContractURI(string memory contractURI_) external onlyOwner {
        contractURI = contractURI_;
    }

    /// @notice Return metadata for specific token, in this case just one token
    /// @param tokenId number of one minted token
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return baseURI;
    }

    /// @dev Support interfaces for Access Control and ERC721
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
