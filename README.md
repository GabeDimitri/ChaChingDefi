
# Custom built DEX to work in confluence with ChaChing Defi Banking Platform

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

# Recap:
1) run the node script
   ```bash
   npx hardhat node
   ```
2) Run deploy script
   ```bash
   npx hardhat run --network localhost ./scripts/1_deploy.js
   ```
3) Run seed script
    ```bash
   npx hardhat run --network localhost ./scripts/2_seed-exchange.js
    ```
4) Run the application
    ```bash
   npm run-script start
    ```

