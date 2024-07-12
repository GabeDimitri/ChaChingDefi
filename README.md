# This is a Custom built DEX to work in confluence with TRW Platform
## Setting up
clone repo
npm install

## to deploy to blockchain run
npx hardhat run --network localhost .\scripts\1_deploy.js

##to seed exchange run
npx hardhat run --network localhost  .\scripts\2_seed-exchange.js

##ro run a testnode
npx hardhat node

##to run testcases for exchange 
npx hardhat test .\test\Exchange.js

##to run all testcases(token included)
npx hardhat test

# To run app
npm run-script start  
