const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(),'ether');  
}

describe("Token", function () {
    let token ,accounts ,deployer,receiver;
    beforeEach(async ()=>{
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy('TopG','TGG','1000000');
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver= accounts[1];
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

          it("assigns total supply to deployery", async function () {
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
          });
    })

 describe('sending Tokens', () => {
    let amount;

    it('Transfer token balances',async ()=>{
        console.log("deployer balance before", await token.balanceOf(deployer.address));
        console.log("receiver balance before", await token.balanceOf(receiver.address));

        amount = tokens(100);  // Ensure this function is defined correctly to parse units
        let transaction = await token.connect(deployer).transfer(receiver.address, amount);
        await transaction.wait();  // Corrected to wait for the transaction to be mined

        console.log("deployer balance after", await token.balanceOf(deployer.address));
        console.log("receiver balance after", await token.balanceOf(receiver.address));

        //ensure balance change

    })
 })
});
