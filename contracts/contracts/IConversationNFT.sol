// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// interface to access the mint function of ConversationNFT
interface IConversationNFT {
    function awardSouvenir(
        address _humanWallet, 
        string calldata tokenURI
    ) external returns (uint);
}
