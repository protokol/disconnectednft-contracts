import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { makeInterfaceId } from "@openzeppelin/test-helpers";
import * as Contracts from "../typechain";

describe("Disconnected", function() {
    // Constants
    const tokenId = 1;
    let accounts: SignerWithAddress[];
    let recipient: string;
    let owner: SignerWithAddress;

    // Contract params
    let DisconnectedFactory: Contracts.Disconnected__factory;
    let disconnected: Contracts.Disconnected;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        recipient = await accounts[0].getAddress();
        owner = await accounts[1];

        DisconnectedFactory = await ethers.getContractFactory("Disconnected");
        
        disconnected = await DisconnectedFactory
            .connect(owner)
            .deploy(
                "Disconnected",
                "DiscNFT",
                "https://disconnectednft.xyz/contract",
                "https://disconnectednft.xyz/nft",
                recipient,
                tokenId
            );

        await disconnected.deployed();
    });

    it("Should Test Smart Contract Deployment", async function() {
        expect(await disconnected.name()).to.equal("Disconnected");
        expect(await disconnected.symbol()).to.equal("DiscNFT");
        expect(await disconnected.contractURI()).to.equal("https://disconnectednft.xyz/contract");
        expect(await disconnected.baseURI()).to.equal("https://disconnectednft.xyz/nft");

        expect(await disconnected.ownerOf(tokenId)).to.equal(recipient);

        expect(await disconnected.owner()).to.equal(await owner.getAddress());

        expect(await disconnected.tokenURI(tokenId)).to.equal("https://disconnectednft.xyz/nft");

        await expect(disconnected.tokenURI(321)).to.be.revertedWith("ERC721Metadata: URI query for nonexistent token");
    });

    it("Should Change Metadata", async () => {
        await disconnected.setBaseURI("http://test");
        expect(await disconnected.baseURI()).to.equal("http://test");

        await disconnected.setContractURI("http://test-contract-uri");
        expect(await disconnected.contractURI()).to.equal("http://test-contract-uri");
    });

    it("Should Change Metadata", async () => {
        const randomAddress = accounts[10];
        await expect(disconnected.connect(randomAddress).setBaseURI("http://test"))
            .to.be.revertedWith("Ownable: caller is not the owner");
        await expect(disconnected.connect(randomAddress).setContractURI("http://test-contract-uri"))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should be able to change ownership, old owner can't change metadata anymore", async () => {
        const newOwner = accounts[2];
        await disconnected.transferOwnership(await newOwner.getAddress());
        expect(await disconnected.owner()).to.equal(await newOwner.getAddress());

        await expect(disconnected.setBaseURI("http://test")).to.be.revertedWith("Ownable: caller is not the owner");
        await expect(disconnected.setContractURI("http://test-contract-uri"))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should test NFT Transfer", async () => {
        const newOwner = await accounts[2].getAddress();
        await disconnected.connect(accounts[0]).transferFrom(recipient, newOwner, tokenId);

        expect(await disconnected.ownerOf(tokenId)).to.equal(newOwner);
    });

    it("Should Not be able to transfer if not token owner", async () => {
        const fakeOwner = await accounts[12];
        const newWANAbeOwner = await accounts[12].getAddress();
        await expect(disconnected.connect(fakeOwner)
            .transferFrom(await fakeOwner.getAddress(), newWANAbeOwner, tokenId))
            .to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
    });

    it("Should be ERC721 interface compatible", async () => {
        const erc721InterfaceId = makeInterfaceId.ERC165([
            "balanceOf(address)",
            "ownerOf(uint256)",
            "safeTransferFrom(address,address,uint256)",
            "transferFrom(address,address,uint256)",
            "approve(address,uint256)",
            "getApproved(uint256)",
            "setApprovalForAll(address,bool)",
            "isApprovedForAll(address,address)",
            "safeTransferFrom(address,address,uint256,bytes)",
        ]);
        expect(await disconnected.supportsInterface(erc721InterfaceId)).to.equal(true);
    });
});
