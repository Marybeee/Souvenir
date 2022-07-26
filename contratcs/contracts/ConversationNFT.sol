// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract to mint NFT and set meta data
contract ConversationNFT is ERC721URIStorage {
    
    // using counters to ensure only incrementing by 1
    using Counters for Counters.Counter;
    // setting _tokenIds to be the Counter
    Counters.Counter private _tokenIds;

    // constructor with tokenName and symbol setting 
    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {        
    }

    // function to: 
    // - set the counter/ identification of the NFT
    // - mint the NFTs to a specific wallet
    // - set the meta data for each NFT seperate
    function awardSouvenir(address _humanWallet, string memory tokenURI) external returns (uint) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_humanWallet, newItemId);
        // set uri for a Conversation
        _setTokenURI(newItemId, tokenURI);
        return (newItemId);
    }

}