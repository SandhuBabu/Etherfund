const Etherfund = artifacts.require("./Etherfund.sol");

module.exports = function(deployer) {
    deployer.deploy(Etherfund);
}