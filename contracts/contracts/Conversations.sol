// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import './Humans.sol';


contract Conversations is Humans {
    
    // using counters to ensure only incrementing by 1
    using Counters for Counters.Counter;
    // setting conversationCounter to be the Counter
    Counters.Counter private conversationCounter;
    
    // Event for the succesful registration of a new Conversastion.
    event NewConversationRegistered (uint256 indexed conversationId, bytes32 indexed conversationName, address indexed personAWallet, address personBWallet);

    // struct of the Conversation with sepcific information needed to mint 
    struct Conversation {
        uint conversationId;
        bytes32 conversationName;
        address personAWallet;
        address personBWallet;
    }

    // array of all the Conversations
    Conversation[] public conversations;

    // Function to register a new Conversation based on input variables.
    function registerConversation(bytes32 _conversationName, address _personAWallet, address _personBWallet) external
    humansNotRegistered(_personAWallet, _personBWallet)  {
        // increment the conversation counter
        conversationCounter.increment();
        // set the new conversation with its specific values
        Conversation memory _newConversation = Conversation({
            conversationId: conversationCounter._value,
            conversationName: _conversationName,
            personAWallet: _personAWallet,
            personBWallet: _personBWallet
        });
        // add the conversation to the conversations array
        conversations.push(_newConversation);
        // emit the new Conversation registered
        emit NewConversationRegistered (conversationCounter._value, _conversationName, _personAWallet, _personBWallet);
    }

}