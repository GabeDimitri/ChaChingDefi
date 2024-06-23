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

    describe('Success',()=>{
      describe('Sending Tokens', () => {
        let amount,transaction,result;
    
        beforeEach(async()=>
        {
          amount=tokens(100)
          transaction = await token.connect(deployer).transfer(receiver.address, amount);
          result = await transaction.wait();  // Corrected to wait for the transaction to be mined
    
        })
    
        it('transfer token balances',async ()=>{
          
            expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
            expect(await token.balanceOf(receiver.address)).to.equal(amount)
            //ensure balance change
    
        })
    
        it('emit transfer event',async()=>{
          const event = result.events[0]
          expect(event.event).to.equal('Transfer')
          const args = event.args
    
          expect(args.from).to.equal(deployer.address)
          expect(args.to).to.equal(receiver.address)
          expect(args.value).to.equal(amount)
        })
     })
    })

    describe('Failure',()=>{
      it('rejects inf funds',async()=>{
        const invalidamnt =tokens(10000000000)
        await expect(token.connect(deployer).transfer(receiver.address, invalidamnt)).to.be.reverted;
      })
      it('rejects inv recipient ',async()=>{
        const amount =tokens(100)
        await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000',amount)).to.be.reverted;
      })
    })

});
