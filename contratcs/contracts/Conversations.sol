// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";


contract Conversations {
    
    using Counters for Counters.Counter;
    Counters.Counter public conversationCounter;

    event NewConversationRegistered (uint indexed conversationId, bytes32 _conversationName, address personAWallet, address personBWallet);

    struct Conversation {
        uint conversationId;
        bytes32 conversationName;
        address personAWallet;
        address personBWallet;
    }

    Conversation[] public conversations;

    // stuct Conversation with conversationName, conversationId, personA and personB
    // mapping with humans and conversations

    function registerConversation(bytes32 _conversationName, address _personAWallet, address _personBWallet) external  {
        conversationCounter.increment();
        Conversation memory _newConversation = Conversation({
            conversationId: conversationCounter._value,
            conversationName: _conversationName,
            personAWallet: _personAWallet,
            personBWallet: _personBWallet
        });
        conversations.push(_newConversation);
       
        emit NewConversationRegistered (conversationCounter._value, _conversationName, _personAWallet, _personBWallet);
    }

}