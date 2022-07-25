// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IConversationNFT {
    function awardSouvenir(
        address _humanWallet, 
        string calldata tokenURI
    ) external;
}
