pragma solidity ^0.8.0;
import './lotteries/PredictTheFuture.sol';

contract AtttackPredictFuture {
    PredictTheFuture public predictContract;
    constructor(address _predictContract) {
        predictContract = PredictTheFuture(_predictContract);
    }

    function lockInGuess(uint8 n) public payable {
        require(msg.value == 1 ether);
        predictContract.lockInGuess{value: 1 ether}(n);
    }
}
