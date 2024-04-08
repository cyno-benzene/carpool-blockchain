


```
  // Install Hardhat
  npm install --save-dev hardhat

  // Install Hardhat Toolbox
   npm install @nomicfoundation/hardhat-toolbox

  // Install dotenv package
  npm install dotenv

  npx hardhat init
  npm install 

```
Prepare the Smart contract 
The deploy.js and hardhat.config.js go hand in hand to deploy the smart contract 
`npx hardhat node` starts a rpc server locally on localhost port 8545
We choose the first account address and private for deploying our smart contract 
Create a hidden env file for storing our RPC_URL and PRIVATE_KEY environment variables, the two variables are the ones available on the hardhat node server

`npx hardhat compile`
`npx hardhat run scripts/deploy.js --network mumbai` to deploy the smart contract.
`npm i -g solc` install solidity compiler locally
`solcjs contract_name.sol --abi -o output_path`for generating the abi file. 
Change the file extension to json, we will be using the json file on the client side 