import Web3 from 'web3'
import tokenContractBuildJSON from 'abis/SatoshiART1155.json'
import marketplaceContractBuildJSON from 'abis/SatoshiART1155Marketplace.json'
import { readCookie } from './cookie'

const web3 = new Web3("https://ropsten.infura.io/v3/bc7b2cf614a04ab3b4acbcd09a43dc6b");
const marketplaceContractAddress = "0xa7545B8b319F779289369DFe4075bab3D249b5f6"
const tokenContractAddress = "0x253d17745A67eA4F6d6320B6fcD669B0E3B5174b"
const artistPrivateKey = "293a001c3d0d203e7005d76d8e432193d6400fc245bb1a948e589dbf44bd6be0"

const marketplaceContractAbi = (<any>marketplaceContractBuildJSON).abi;
const marketplaceContract = new web3.eth.Contract(
	marketplaceContractAbi,
	marketplaceContractAddress
);

const tokenContractAbi = (<any>tokenContractBuildJSON).abi
const tokenContract = new web3.eth.Contract(
	tokenContractAbi,
	tokenContractAddress
);

const sendTransaction = async (
	fromKey: any,
	to: any,
	abiEncoding: any,
	value = 0,
	gas = 200000
) => {
	const txData = {
		from: web3.eth.accounts.privateKeyToAccount(fromKey).address,
		to: to,
		data: abiEncoding,
		gas: gas,
		value: value,
	};

	const signedTx: any = await web3.eth.accounts
		.signTransaction(txData, fromKey)
		.then((res) => res);

	const tx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	const res = await new Promise((resolve, reject) => {
		tx.once("error", (err) => reject(err));

		tx.on("confirmation", (confirmationNumber, receipt) => {

			if (confirmationNumber > 2) {
				resolve(receipt);
			}
		});
  	});

  return res;
};

const createCollectibleToken = async (collectibleCount: number, royalty: number) => {
  const res: any = await sendTransaction(
    artistPrivateKey,
    tokenContractAddress,
    tokenContract.methods.createItem(collectibleCount, royalty).encodeABI(),
    0, // value
    500000 // gas
  );

  const data = res.logs[0].data.substring(194).match(/.{1,64}/g);
  const tokenId = [];

  for (let i = 0; i < collectibleCount; i++) {
    tokenId.push(parseInt("0x" + data[i]));
  }

  console.log(`The token IDs of created collectibles are ${tokenId}.`);
  return tokenId;
};

const getOutstandingBalance = async (metamaskid: any) => {
  const balance = await marketplaceContract.methods.outstandingPayment(metamaskid).call();
  const balanceInEther = web3.utils.fromWei(balance, "ether"); // eth

  return balanceInEther;
};

export { createCollectibleToken, getOutstandingBalance }