
# Custom built DEX to work in confluence with TRW Platform

## Setting up

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Deploying to Blockchain

To deploy the smart contracts to the blockchain:
```bash
npx hardhat run --network localhost ./scripts/1_deploy.js
```

## Seeding the Exchange

To seed the exchange with initial data:
```bash
npx hardhat run --network localhost ./scripts/2_seed-exchange.js
```

## Running a Test Node

To run a local test node:
```bash
npx hardhat node
```

## Running Test Cases for Exchange

To run test cases specifically for the exchange:
```bash
npx hardhat test ./test/Exchange.js
```

## Running All Test Cases (Including Token Tests)

To run all test cases, including those for tokens:
```bash
npx hardhat test
```

## Running the Application

To start the application:
```bash
npm run-script start
```

Replace `<repository-url>` with the actual URL of your repository. This `README.md` structure provides clear instructions for setting up, deploying, seeding, running tests, and starting the application.
