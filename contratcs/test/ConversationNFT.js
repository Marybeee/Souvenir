//import Chai library
const { expect } = require("chai");
//import ethers
const { ethers } = require("hardhat")
// set utils to handle strings used as byte32
const utils = ethers.utils

var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

// set up for the contract we want to test
describe("ConversationNFT", function (){
    let ConversationNFT;
    let hardhatConversationNFT;
    let admin;
    let person;
    let person2;
    let addresses;
    
    //Hook // before each individual test do
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, person, person2, ...addresses] = await ethers.getSigners();
 
        //Create an instance of our contract
        ConversationNFT = await ethers.getContractFactory("ConversationNFT");

        //Deploy this instance
        hardhatConversationNFT = await ConversationNFT.deploy("Souvenir","suv");
    });

    // Test case for deploying the contract
    describe("Checking if contract is deployed to network", function(){
        //Testcase 1 Succesful deployment
        it("Should deploy sucessfully", async function(){
            const address = hardhatConversationNFT.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
        });
    });

    describe("Checking if the contract award Souvenir by minting", function(){
        // Testcase for succesful minting 
        it("Should mint succesful and return the tokenId", async function(){
            const tokenURI = "ipfs:/";
            const token = await hardhatConversationNFT.awardSouvenir(person.address, tokenURI);
            //console.log(token);
            expect(await hardhatConversationNFT.balanceOf(person.address)).to.equal(1);
            expect(await hardhatConversationNFT.ownerOf(1)).to.equal(person.address);
            expect(await hardhatConversationNFT.tokenURI(1)).to.equal(tokenURI);
        })
    });
});