import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";

let accounts: Signer[];
let contract: Contract;

describe('Solutions: warm up', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("CallMe");
        contract = await factory.deploy();
    }
    ))
    it("solves the challenge", async () => {
        await contract.callme();
        let solution = await contract.isComplete();
        expect(solution).to.equal(true);
    })

})
describe('Solutions: Nickname', () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("CaptureTheEther");
        contract = await factory.deploy();
    }))

    it("solves the challenge", async () => {
        const nickname = ethers.utils.formatBytes32String("RandoYieldDev")
        const tx = await contract.setNickname(nickname);
        const txReceipt = await tx.wait();
        expect(txReceipt.status).to.equal(1);
    })

})