const { ethers } = require("hardhat");

const main = async () => {
    // obtain the first signer from the list of signers
    const signer = (await ethers.provider.getSigner())[0];

    const ContractFactory = await ethers.getContractFactory("CarPool", signer);
    // the file name under 'contracts' folder, without '.sol'
    
    const Contract = await ContractFactory.deploy();

    console.log("Contract deployed to:", await Contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
