import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";


let accounts: Signer[];
let contract: Contract;

describe('Solutions: Guess The Number', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("GuessTheNumber");
        contract = await factory.deploy();
        await contract.GuessTheNumberChallenge({ value: ethers.utils.parseEther("1.0") })

    }))

    it("solves the challenge", async () => {
        await contract.guess(42, { value: ethers.utils.parseEther("1.0") });
        expect((await contract.isComplete())).to.equal(true);

    })
})

describe('Solutions: Guess the secret number', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("GuessTheSecretNumber");
        contract = await factory.deploy();
        await contract.GuessTheSecretNumberChallenge({ value: ethers.utils.parseEther("1.0") })
    }))
    it("solves the challenge", async () => {
        // Can't use a getter because the var is private in the contract
        // but the data is still transparent on chain so we can just get it from the node
        let answerHash = await contract.provider.getStorageAt(contract.address, 0)

        // then we brute force to find a matching hash, since uint8 (2**8) is only 256 possibilities this is trivial
        for (let i = 0; i < 256; i++) {
            const hash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["uint8"], [i]));
            if (hash === answerHash) {
                await contract.guess(i, { value: ethers.utils.parseEther("1.0") });
                expect(await contract.isComplete()).to.equal(true);
                return;
            }
        }
    })

})

describe('Solutions: Guess the random number', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("GuessTheRandomNumber");
        contract = await factory.deploy();
        await contract.GuessTheRandomNumberChallenge({ value: ethers.utils.parseEther("1.0") })
    }))

    it("solves the challenge", async () => {
        // once again the answer (this time not hashed) is transparent on chain, we can just call it from the node
        let answer = await contract.provider.getStorageAt(contract.address, 0)
        await contract.guess(answer, { value: ethers.utils.parseEther("1.0") });
        expect(await contract.isComplete()).to.equal(true);
        
    })

})

describe('Solutions: Guess the new number', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("GuessTheNewNumber");
        contract = await factory.deploy();
        await contract.GuessTheNewNumberChallenge({ value: ethers.utils.parseEther("1.0") })
    }))
    it("Solves the challenge", async () => {
        const attackFactory = await ethers.getContractFactory("ProxyAttack")
        const proxy = await attackFactory.deploy(contract.address)
        await proxy.attack({ value: ethers.utils.parseEther("1.0")})
        expect(await contract.isComplete()).to.equal(true);
    })

})

describe('Solution: Predict the future', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("PredictTheFuture");
        contract = await factory.deploy();
    }))
    it("Solves the challenge", async () => {
        // work
        await contract.lockInGuess(0)
        
    })
})
describe('Solution: Predict the blockhash', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("PredictTheBlockHash");
        contract = await factory.deploy();
    }))
    it("Solves the challenge", async () => {
        // work
    })

})