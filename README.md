# Disconnected NFT

[comment]: <> (Insert banner // TODO)
[comment]: <> (Insert description // TODO)

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
--name TestNFT \
--symbol TN \
--contracturi https://gateway.pinata.cloud/ipfs/QmRgRdHEiEJTxELqGeFwnqMF67tHKPst4vYZiMQu28rxFZ \
--baseuri https://gateway.pinata.cloud/ipfs/QmZU9o2PU1RRXCPbJv6feeoPdM5WRz2aTND25z5xNArsfr \ 
--recipient 0x0D5628AA19Ae6DA51333b61825e72DfB7cDdc97B \
--token 123 \
--network mumbai
```

