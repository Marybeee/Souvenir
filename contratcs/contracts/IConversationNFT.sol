// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// interface to access the mint function of ConversationNFT
interface IConversationNFT {

    // Returns the id of token minted in ``owner``'s account.
    function awardSouvenir(address _humanWallet, string calldata tokenURI) external returns (uint);

    // Returns the number of tokens in ``owner``'s account.
    function balanceOf(address owner) external view returns (uint256 balance);
    
    // Returns the owner of the `tokenId` token.
    function ownerOf(uint256 tokenId) external view returns (address owner);

    // Returns the Uniform Resource Identifier (URI) for `tokenId` token.
    function tokenURI(uint256 tokenId) external view returns (string memory); 
}
