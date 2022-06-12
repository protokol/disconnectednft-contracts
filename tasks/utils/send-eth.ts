import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

task("send-eth", "Send Native Tokens")
    .addParam<string>("recipient", "Recipient of ETH")
    .addParam<string>("value", "Amount of ETH to send")
    .setAction(async (taskArgs, { ethers }) => {
        const account = (await ethers.getSigners())[0];
        const sendTrx = await account.sendTransaction({
            to: taskArgs.recipient,
            value: ethers.utils.parseEther(taskArgs.value),
        });
        console.log(`Transaction Hash: ${sendTrx.hash}`);
        await sendTrx.wait(2);
        console.log("Transaction confirmed");
    });
