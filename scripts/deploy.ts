import { ethers } from "hardhat";

async function main() {


  const Deploy = await ethers.getContractFactory("DeployChallenge");
  const deploy = await Deploy.deploy();

  await deploy.deployed();

  console.log(
    deploy.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
