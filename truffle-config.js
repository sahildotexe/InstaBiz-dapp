require("babel-register");
require("babel-polyfill");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          "orchard electric argue fluid wing head defy brush wrong iron cute know",
          `https://rpc-mumbai.maticvigil.com/v1/aff36971efc7b2f8d882b5c5e1da3f436a364f2a
`
        ),
      network_id: 80001,
      confirmations: 2,
      skipDryRun: true,
      networkCheckTimeoutnetworkCheckTimeout: 10000,
      timeoutBlocks: 200,
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        version: "0.5.16",
        enabled: true,
        runs: 200,
      },
    },
  },
};
