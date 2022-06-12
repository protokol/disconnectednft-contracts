import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { Disconnected } from "../../typechain";

task("transfer-ownership", "Transfer contract ownership")
    .addParam<string>("contract", "Contract address")
    .addParam<string>("newowner", "New owner of the contract")
    .setAction(async (taskArgs, { ethers }) => {
        const contractFactory = await ethers.getContractFactory("Disconnected");
        const account = (await ethers.getSigners())[0];
        const contract = new ethers.Contract(
            taskArgs.contract,
            contractFactory.interface,
            account
        ) as Disconnected;
        const transfer = await contract.transferOwnership(taskArgs.recipient);
        console.log(`Transaction Hash: ${transfer.hash}`);
        await transfer.wait(2);
        console.log("Transaction confirmed");
    });
