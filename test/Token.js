const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(),'ether');  
}

describe("Token", function () {
    let token ;
    beforeEach(async ()=>{
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy('TopG','TGG','1000000');
    
    })

    describe('Deployment', ()=>{
        const name = 'TopG';
        const symbol = 'TGG';
        const decimals = '18';
        const totalSupply = tokens('1000000');

        it("has the correct name", async function () {
            expect(await token.name()).to.equal(name);
          });
        
          it("has the correct symbol", async function () {
            expect(await token.symbol()).to.equal(symbol);
          });
        
          it("has the correct decimals", async function () {
            expect(await token.decimals()).to.equal(decimals);
          });
        
          it("has the correct totalSupply", async function () {
            expect(await token.totalSupply()).to.equal(totalSupply);
          });
    })

 
});
