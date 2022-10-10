const Market = artifacts.require("market");

module.exports = function(deployer) {
  deployer.deploy(Market);
};