import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { Disconnected } from "../../typechain";

task("transfer-nft", "Transfer nft token")
    .addParam<string>("contract", "Contract address")
    .addParam<string>("recipient", "Recipient of the NFT")
    .addParam<string>("token", "Token id")
    .setAction(async (taskArgs, { ethers }) => {
        const contractFactory = await ethers.getContractFactory("Disconnected");
        const account = (await ethers.getSigners())[0];
        const contract = new ethers.Contract(
            taskArgs.contract,
            contractFactory.interface,
            account
        ) as Disconnected;
        const transfer = await contract.transferFrom(await account.getAddress(), taskArgs.recipient, taskArgs.tokenId);
        console.log(`Transaction Hash: ${transfer.hash}`);
        await transfer.wait(2);
        console.log("Transaction confirmed");
    });
