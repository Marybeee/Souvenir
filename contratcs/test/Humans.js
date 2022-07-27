//import Chai library
const { expect } = require("chai");
//import ethers
const { ethers } = require("hardhat")
// set utils to handle strings used as byte32
const utils = ethers.utils

var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

// set up for the contract we want to test
describe("Humans", function (){
    let Humans;
    let hardhatHumans;
    let admin;
    let person;
    let person2;
    let addresses;
    
    //Hook // before each individual test do
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, person, person2, ...addresses] = await ethers.getSigners();
 
        //Create an instance of our contract
        Humans = await ethers.getContractFactory("Humans");

        //Deploy this instance
        hardhatHumans = await Humans.deploy();
    });

    // Test case for deploying the contract
    describe("Checking if contract is deployed to network", function(){
        //Testcase 1 Succesful deployment
        it("Should deploy sucessfully", async function(){
            const address = hardhatHumans.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
        });
    });
    // Test case for succesful register an human
    describe("Test for register an human", function(){
        it("Tests if the humans array is set correctly after registration", async function(){
            const stringInBytes = utils.formatBytes32String("Human 1")
            await hardhatHumans.registerHuman(stringInBytes, person.address);
            const humans = await (hardhatHumans.connect(admin).humans(0));
            // eq cause it is Bignumber
            expect(1).to.eq(humans[0]);
            expect(stringInBytes).to.eql(humans[1]);
            expect(person.address).to.eql(humans[2]);
        });
       
        it("Tests that the emitted event is correct", async function(){
            //const [id, name, humanWallet] = hardhatHumans.getPerson(hashForJohn);
            const stringInBytes = utils.formatBytes32String("Test");

            await expect(hardhatHumans.registerHuman(stringInBytes, person.address))
                .to.emit(hardhatHumans, "NewHumanRegistered")
                .withArgs(1, stringInBytes, person.address);
        });
        it("Tests that human wallet address can't used two times", async function(){
            const stringInBytes = utils.formatBytes32String("Human 1");
            await hardhatHumans.registerHuman(stringInBytes, person.address);
            await expect(hardhatHumans.registerHuman(stringInBytes, person.address)).to.be.revertedWith("Can't reqister twice");
        });
    });
});