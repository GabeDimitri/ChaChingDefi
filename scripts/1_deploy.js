async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("preparing deployment");
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Token = await ethers.getContractFactory("Token");
    const Exchange = await ethers.getContractFactory("Exchange");

    //fetch accounts
    const accounts = await ethers.getSigners()

    console.log(`Accounts fetched ${accounts[0].address} and ${accounts[1].address}`, deployer.address);

    const tgcCoin = await Token.deploy('Top Gabe Coder','TGC','1000000');
    await tgcCoin.deployed();
    console.log("TGC deployed to:", tgcCoin.address);

    const mETH = await Token.deploy('mETH','mETH','1000000');
    await mETH.deployed();
    console.log("mETH deployed to:", mETH.address);

    const mDAI = await Token.deploy('mDAI','mDAI','1000000');
    await mDAI.deployed();
    console.log("mDAI deployed to:", mDAI.address);
    
    const exchange = await Exchange.deploy(accounts[1].address,10);
    await exchange.deployed();
    console.log("Exchnange deployed to:", exchange.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  