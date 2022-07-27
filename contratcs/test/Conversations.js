//import Chai library
const { expect } = require("chai");
//import ethers
const { ethers } = require("hardhat")
// set utils to handle strings used as byte32
const utils = ethers.utils

var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

// set up for the contract we want to test
describe("Conversations", function (){
    let Conversations;
    let hardhatConversations;
    let admin;
    let person;
    let person2;
    let addresses;
    
    //Hook // before each individual test do
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, person, person2, ...addresses] = await ethers.getSigners();
 
        //Create an instance of our contract
        Conversations = await ethers.getContractFactory("Conversations");

        //Deploy this instance
        hardhatConversations = await Conversations.deploy();
    });

    // Test case for deploying the contract
    describe("Checking if contract is deployed to network", function(){
        //Testcase 1 Succesful deployment
        it("Should deploy sucessfully", async function(){
            const address = hardhatConversations.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
        });
    });
    // Test case for succesful register an conversation
    describe("Test for register a conversation", function(){
        it("Tests if the conversation array is set correctly after registration", async function(){
            const stringInBytesHuman1 = utils.formatBytes32String("Human 1")
            await hardhatConversations.registerHuman(stringInBytesHuman1, person.address);
            const stringInBytesHuman2 = utils.formatBytes32String("Human 2")
            await hardhatConversations.registerHuman(stringInBytesHuman2, person2.address);

            const stringInBytes = utils.formatBytes32String("Conversation 1")
            await hardhatConversations.registerConversation(stringInBytes, person.address, person2.address);
            const conversations = await (hardhatConversations.connect(admin).conversations(0));
            expect(1).to.eq(conversations[0]);
            expect(stringInBytes).to.eql(conversations[1]);
            expect(person.address).to.eql(conversations[2]);
            expect(person2.address).to.eql(conversations[3]);
        });
       
         it("Tests that the emitted event is correct", async function(){
            const stringInBytesHuman1 = utils.formatBytes32String("Human 1")
            await hardhatConversations.registerHuman(stringInBytesHuman1, person.address);
            const stringInBytesHuman2 = utils.formatBytes32String("Human 2")
            await hardhatConversations.registerHuman(stringInBytesHuman2, person2.address);

             const stringInBytes = utils.formatBytes32String("Conversation");

             await expect(hardhatConversations.registerConversation(stringInBytes, person.address, person2.address))
                 .to.emit(hardhatConversations, "NewConversationRegistered")
                 .withArgs(1, stringInBytes, person.address, person2.address);
        });

        it("Tests that just non registered Humans are not able to have a conversation", async function(){
            const stringInBytesHuman1 = utils.formatBytes32String("Human 1")
            await hardhatConversations.registerHuman(stringInBytesHuman1, person.address);

            const stringInBytes = utils.formatBytes32String("Conversation 1")
            await expect (hardhatConversations.registerConversation(stringInBytes, person.address, person2.address)).to.be.reverted;

        })
    });
});