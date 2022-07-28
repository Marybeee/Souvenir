// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Humans is Ownable {
    
    // using counters to ensure only incrementing by 1
    using Counters for Counters.Counter;
    // setting humanCounter to be the Counter
    Counters.Counter private _humanCounter;

    // event for succesful registration of a human
    event NewHumanRegistered (Human _human);

    // struct of the Human with sepcific information of the human
    struct Human {
        uint256 humanId;
        bytes32 name;
        address humanWallet;
    }

    // array of all the registered humans
    Human[] public humans;

    // mapping of address to humanId
    mapping (address => uint) public humandWalletToHumanId;

    // function to register a new human based on input variables
    function registerHuman(bytes32 _name, address _humanWallet) external onlyOwner {
        // check that a human is not already registered with this address
        require(humandWalletToHumanId[_humanWallet] == 0, "Can't reqister twice");
        // increment the human counter by one
        _humanCounter.increment();
        // set the values in a struct for the new human
        Human memory _newHuman = Human({
            humanId: _humanCounter._value,
            name: _name,
            humanWallet: _humanWallet
        });
        // push the new registered human into the array of all humans registered
        humans.push(_newHuman);
        // map the new registeried human by its counter to its wallet address
        humandWalletToHumanId[_humanWallet] = _humanCounter._value;
        // emit the new human registered
        emit NewHumanRegistered (_newHuman);
    }
}
