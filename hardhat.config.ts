import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";

dotenv.config();

import "./tasks/deployments/deploy";
import "./tasks/deployments/transfer-ownership";

import "./tasks/operational/transfer-nft";

import "./tasks/utils/accounts";
import "./tasks/utils/balance";
import "./tasks/utils/block-number";
import "./tasks/utils/send-eth";

const MATIC_RPC_URL = process.env.MATIC_RPC_URL || "https://polygon-mainnet.infura.io/v3/your-api-key";
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "https://polygon-mumbai.infura.io/v3/your-api-key";
const MNEMONIC = process.env.MNEMONIC || "your mnemonic";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.13",
        settings: {
            optimizer: {
                enabled: true,
                runs: 20000,
            },
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        matic: {
            url: MATIC_RPC_URL,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
        },
        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: {
            //polygon
            polygon: POLYGONSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY
        }
    },
};

export default config;
