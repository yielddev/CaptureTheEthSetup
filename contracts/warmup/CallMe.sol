pragma solidity ^0.8.0;

contract CallMe {
    bool public isComplete = false;

    function callme() public {
        isComplete = true;
    }
}

