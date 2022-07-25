// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Humans is Ownable {
    
 
    using Counters for Counters.Counter;
    Counters.Counter private humanCounter;

    event NewHumanRegistered (uint indexed humanId, Human _human);

    struct Human {
        uint256 humanId;
        bytes32 name;
        address humanWallet;
    }

    Human[] public humans;

    // eventually not needed
    mapping (address => uint) public humandWalletToHumanId;

    function registerHuman(bytes32 _name, address _humanWallet) external onlyOwner {
        require(humandWalletToHumanId[_humanWallet] == 0, "Can't reqister twice");
        humanCounter.increment();
        Human memory _newHuman = Human({
            humanId: humanCounter._value,
            name: _name,
            humanWallet: _humanWallet
        });
        humans.push(_newHuman);
        // eventually not needed
        humandWalletToHumanId[_humanWallet] = humanCounter._value;
        emit NewHumanRegistered (humanCounter._value, _newHuman);
    }
}
