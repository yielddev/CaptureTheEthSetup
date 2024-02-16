// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

import "./TokenWhaleChallenge.sol";

/// @dev Run the template with
///      ```
///      solc-select use 0.8.0
///      echidna program-analysis/echidna/exercises/exercise3/template.sol --contract TestToken
///      ```
contract TestToken is TokenWhaleChallenge {
    address echidna = msg.sender;

    // TODO: update the constructor
    constructor() TokenWhaleChallenge(echidna) {
        player = echidna;
    }

    function echidna_test_balance() public view returns (bool) {
        return balanceOf[msg.sender] <= 1000;
    }
}
