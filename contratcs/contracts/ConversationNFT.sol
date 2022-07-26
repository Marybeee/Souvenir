// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ConversationNFT is ERC721URIStorage {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
    //ERC721("ConversationSouvenir", "CS") public {
        
    }


    function awardSouvenir(address _humanWallet, string memory tokenURI) external returns (uint) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_humanWallet, newItemId);
        // set uri for a Conversation
        _setTokenURI(newItemId, tokenURI);
        return (newItemId);
    }

}