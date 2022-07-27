// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import './Conversations.sol';
import './IConversationNFT.sol';

// contract to handle the mint of NFTs based on Conversations
contract ConversationNFTHandler is Conversations {
    
    // event for succesful mint of two NFTs for each human 
    //!!! could probably be optimized -> decide if 2 Events are better or using a struct
    event ConversationNFTsMinted (address indexed personAWallet, address indexed personBWallet, uint indexed conversationId, uint _nftIdA, uint _nftIdB);

    // address of the contract how mints the NFT 
    address private conversationNFTAddress; 

    // map the converstions and NFTs to make sure a NFT just get minted once
    mapping (uint => uint8) public mintedConversations;
    // map nftId to each wallet
    mapping  (uint => address) public mintedNftPersonWallet;

    // constructor with setting the correct address of the contract we are accessing when minting
    constructor(address _conversationNFTAddress) {   
        // setting the correct address
        conversationNFTAddress = _conversationNFTAddress;
    }

    // function to mint the NFTs to the two wallet adresses
    function mintConversationSouvenir (uint _conversationId, address _personAWallet, address _personBWallet, string memory tokenURI) external
    humansNotRegistered(_personAWallet, _personBWallet)  {
        // require no NFT is minted for the specific conversation
        require(mintedConversations[_conversationId] == 0, "Can't mint twice");
        uint _nftIdA;
        uint _nftIdB;
        _nftIdA = singleMint(_personAWallet, tokenURI);
        _nftIdB = singleMint(_personBWallet, tokenURI);
        mintedConversations[_conversationId] = 1;

        emit ConversationNFTsMinted(_personAWallet, _personBWallet, _conversationId, _nftIdA, _nftIdB);
    }

    // function to call the mint from the IConversationNFT interface with return value of the NFT id
    function singleMint(address _humanWallet, string memory _tokenURI) private returns (uint) {
        uint nftId;
        // sets the nftid which is given by minting
        nftId = IConversationNFT(conversationNFTAddress).awardSouvenir(_humanWallet, _tokenURI);
        // set mapping of minted NFT to wallet
        mintedNftPersonWallet[nftId] = _humanWallet;
        return (nftId);
    }

}