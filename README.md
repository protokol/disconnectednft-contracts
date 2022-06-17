# Disconnected NFT

![Banner](banner.jpg)

## Description

Disconnected is a one-of-one, dynamic, evolving NFT artwork that leverages United Nations datasets to track global internet connectivity rates. Disconnected will evolve over time, continuing to grow as more and more people are connected to the internet.

At the time of minting, 37% of the world’s population (approximately 3 billion people) have never used the internet. Disconnected has been created to raise awareness of this fact and encourage the world’s governments to do more in ensuring their citizens have access to a free and open internet.

## Technical Instructions

Before executing any of the commands run:

```shell
npm run compile
```

#### Test

```shell
npm run test
```

#### Coverage

```shell
npm run test:coverage
```

#### Depyloment

```shell
hh deploy \
--name Disconnected \
--symbol DIS \
--contracturi https://raw.githubusercontent.com/protokol/disconnectednft-contracts/master/metadata/contract.json \
--baseuri https://raw.githubusercontent.com/protokol/disconnectednft-contracts/master/metadata/nft.json \
--recipient 0xecF9CA2F9236981D5669876A9d79712bb0852907 \
--token 1 \
--network matic
```
