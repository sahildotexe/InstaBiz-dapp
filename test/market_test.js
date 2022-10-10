const { assert } = require("chai");
const { default: Web3 } = require("web3");

const market = artifacts.require("./market.sol");

contract('market',([deployer,seller,buyer])=>{
let marketplace;
before(async()=> {
    marketplace=await market.deployed()
})
describe('deployment',async()=>{
    it('deplys successfully',async()=>{
    const address=await marketplace.address
    assert.notEqual(address,0x0)
    assert.notEqual(address,'')
    assert.notEqual(address,null)
    assert.notEqual(address,undefined)
    })
})
describe('products',async()=>{
    let result,productcount;
    before(async()=> {
        const Web3Utils = require('web3-utils');
        result=await marketplace.createproduct('prod1',Web3Utils.toWei('1','Ether'))
        productcount=await marketplace.productcount()
    })
    it('creates products',async()=>{
        assert.equal(productcount,1)
        console.log(result.logs)
    })
    it('sells products',async()=>{
        const Web3Utils = require('web3-utils');
    result=await marketplace.purchase(productcount,{from:buyer,value:Web3Utils.toWei('1','Ether')})   
    console.log(result.logs) 
    })
})

})