//import Chai library
const { expect } = require("chai");
//import ethers
const { ethers } = require("hardhat")
// set utils to handle strings used as byte32
const utils = ethers.utils

var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

// set up for the contract we want to test
describe("ConversationNFTHandler", function (){
    let ConversationNFTHandler;
    let hardhatConversationNFTHandler;
    let ConversationNFT;
    let conversationNFT;
    let admin;
    let person;
    let person2;
    let addresses;
    
    //Hook // before each individual test do
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, person, person2, ...addresses] = await ethers.getSigners();
        
        //Create an instance of our ConversationNFT
        ConversationNFT = await ethers.getContractFactory("ConversationNFT");
        conversationNFT = await ConversationNFT.connect(admin).deploy("Souvenir","suv");
        await conversationNFT.deployed();

        //Create an instance of our contract
        ConversationNFTHandler = await ethers.getContractFactory("ConversationNFTHandler");

        //Deploy this instance
        hardhatConversationNFTHandler = await ConversationNFTHandler.deploy(conversationNFT.address);
    });

    // Test case for deploying the contract
    describe("Checking if contract is deployed to network", function(){
        //Testcase 1 Succesful deployment
        it("Should deploy sucessfully", async function(){
            const address = hardhatConversationNFTHandler.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
        });
    });

    describe("Checking the mintConversationSouvenir function", function(){
        it("Should mint into the correct wallet addresses");
        it("Should revert if the one of the wallet addresses is not registered");
        it("Should revert if the conversation already got minted");
        it("Should emit an event after succesful mint");
    })
});