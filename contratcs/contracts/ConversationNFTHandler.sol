// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import './Conversations.sol';
import './IConversationNFT.sol';

contract ConversationSouvenirNFTHandler is Conversations {
    address private conversationNFTAddress; 

    mapping (uint => uint8) mintedConversations;
    // set uri for a Conversation
    // upload meta data for a specifc conversation
    // upload image for a specifc conversation
    // function nFTToHumans require personA or personB is calling it
    // require no NFT is minted for the specific conversation
    constructor(address _conversationNFTAddress) {    
        conversationNFTAddress = _conversationNFTAddress;
    }
    function mintConversationSouvenir (uint _conversationId, address _personAWallet, address _personBWallet, string memory tokenURI) external {
        require(mintedConversations[_conversationId] == 0, "Can't mint twice");
        // require only human addresses allowed to mint
        singleMint(_personAWallet, tokenURI);
        singleMint(_personBWallet, tokenURI);
        mintedConversations[_conversationId] = 1;
    }

    function singleMint(address _humanWallet, string memory _tokenURI) internal {
        IConversationNFT(conversationNFTAddress).awardSouvenir(_humanWallet, _tokenURI);
    }

}