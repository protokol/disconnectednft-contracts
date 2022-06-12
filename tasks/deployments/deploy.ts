import { task } from "hardhat/config";

task("deploy", "Deploy smart contract")
    .addParam("name", "Name of the contract")
    .addParam("symbol", "Symbol of the contract")
    .addParam("contracturi", "Contract URI for the contract")
    .addParam("baseuri", "Base URI for the contract")
    .addParam("recipient", "Recipient of the NFT")
    .addParam("token", "ID of the NFT")
    .setAction(async (taskArgs, { ethers } ) => {
        console.log("Start smart contract deployment!");
        const contractFactory = await ethers.getContractFactory("Disconnected");
        
        const contract = await contractFactory.deploy(
            taskArgs.name,
            taskArgs.symbol,
            taskArgs.contracturi,
            taskArgs.baseuri,
            taskArgs.recipient,
            taskArgs.token
        );
        console.log("[CONTRACT ADDRESS]:",contract.address);
        console.log("[TRANSACTION HASH]:",contract.deployTransaction.hash);
        console.log("[DEPLOY ADDRESS]:",contract.deployTransaction.from);
        await contract.deployed();
        console.log("Contract deployed");
    });
