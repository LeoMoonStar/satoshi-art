import Web3 from 'web3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokenContractBuildJSON = require('./SatoshiART1155.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const marketplaceContractBuildJSON = require('./SatoshiART1155Marketplace.json');

const config = process.env;
console.log(process.env);

export const web3 = new Web3(
  (config.RPC_URL as string) || 'https://ropsten.infura.io/v3/bc7b2cf614a04ab3b4acbcd09a43dc6b'
);
console.log(web3.currentProvider);
const marketplaceContractAbi = marketplaceContractBuildJSON.abi;
const marketplaceContract = new web3.eth.Contract(marketplaceContractAbi, '0xa7545B8b319F779289369DFe4075bab3D249b5f6');
// config.marketplaceContractAddress
const tokenContractAbi = tokenContractBuildJSON.abi;
const tokenContract = new web3.eth.Contract(tokenContractAbi, '0x253d17745A67eA4F6d6320B6fcD669B0E3B5174b');

//token and marketplace contract is ours..

export const createSignature = async (from: string): Promise<void> => {
  const txData = { from: from, to: '0xDe4BC510A1B704A7FFCa7D7ebC9c697f3c23b1d9', value: 1, gas: 500000 };
  const signedReceipt = await web3.eth.sendTransaction(txData);
  console.log(signedReceipt);
  return signedReceipt as any;
};

const tokenContractAddress = config.tokenContractAddress;
const marketplaceContractAddress = config.marketplaceContractAddress;
// const marketplaceContract = new web3.eth.Contract(marketplaceContractAbi, marketplaceContractAddress);

// const tokenContractAbi = tokenContractBuildJSON.abi;
// const tokenContract = new web3.eth.Contract(tokenContractAbi, tokenContractAddress);

const sendTransaction = async (
  from: string,
  to: string,
  abiEncoding: string,
  value = 0,
  gas = 200000
): Promise<any> => {
  const txData = {
    from: from,
    to: to,
    data: abiEncoding,
    gas: gas,
    value: value,
  };

  const signedTx = await web3.eth.accounts.signTransaction(txData, from).then(res => res);

  const tx = web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);

  const res = await new Promise((resolve, reject) => {
    tx.once('error', err => {
      reject(err);
    });

    tx.on('confirmation', (confirmationNumber, receipt) => {
      // For production environment, we should use a larger confirmation number
      if (confirmationNumber > 2) {
        resolve(receipt);
      } else {
        console.log(confirmationNumber);
      }
    });
  });

  return res as any;
};

/**
 *
 * 1. Create Process
 * - Validate whether the user is an approved artist by isApprovedArtist()
 * - Creat the item on blokchain by createCollectibleAbi()
 * - Get the tokenId from the previous step
 * - Call our backend API to store the newly created item in our database
 *
 * 2. Buy/Sell Process
 * - List an item to make it tradeable by putOnSale()
 * - To buy a listed item - call buy()
 *
 */
/**
 * Check if an address is approved to create collectible.
 *
 * Anyone can call this method.
 * This is a testing contract and it's subject to frequent changes.
 **/
export const isApprovedArtist = async (artistAddress: string): Promise<boolean> => {
  const creatorRoleByte = await tokenContract.methods.CREATOR_ROLE().call();

  const approval = await tokenContract.methods.hasRole(creatorRoleByte, artistAddress).call();

  console.log(`The creator approval status of address(${artistAddress}) is ${approval}.`);
  return approval;
};
/**
 * Creat Collectible Example. The multiplier of royalty is 10000 (i.e. 10% -> 1000)
 *
 * Only approved artist addresses can call this method.
 *
 * To add more testing artist, please contact lucas.pan@fintelics.com.
 **/
export const createCollectibleAbi = async (
  creatorAddress: string,
  collectibleCount: number,
  royalty: number // royalty ranges from 0 to 1000, corresponding to 0% to 10%
): Promise<number[]> => {
  const res = await sendTransaction(
    creatorAddress,
    tokenContractAddress as string,
    tokenContract.methods.createItem(collectibleCount, royalty).encodeABI(),
    0,
    500000
  );

  const data = res.logs[0].data.substring(194).match(/.{1,64}/g);
  const tokenId = [];

  let i;
  for (i = 0; i < collectibleCount; i++) {
    tokenId.push(parseInt('0x' + data[i]));
  }

  console.log(`The token IDs of created collectibles are ${tokenId}.`);
  return tokenId;
};

export const checkTokenBalance = async (artistAddress: string, tokenId: number): Promise<number> => {
  const tokenBalance = await tokenContract.methods.balanceOf(artistAddress, tokenId).call();

  console.log(`${artistAddress} owns ${tokenBalance} copies of tokenId - ${tokenId}`);
  return tokenBalance;
};

/**
 * Seller put the collectible on the marketplace to sell.
 * The price is in ether.
 *
 * The current owner (seller) of the collectible can call this method.
 *
 * if you create wiht put on sale need to call this funciton...creare collecitble
 **/
export const putOnSaleAbi = async (sellerAddress: string, tokenId: number, price: number): Promise<void> => {
  await sendTransaction(
    sellerAddress,
    marketplaceContractAddress as string,
    marketplaceContract.methods.putOnSale(tokenId, web3.utils.toWei(String(price), 'ether')).encodeABI()
  );

  console.log(`Collectible (token ID ${tokenId}) is put on the marketplace to sell.`);
};

/**
 * Buyer buys the collectible from seller. Ether is transferred to the marketplace.
 * Commission and royalty are automatically calculated.
 * The payment is in ether.
 *
 * The buyer can call this method.
 **/
export const buy = async (
  buyerAddress: string,
  tokenId: number,
  sellerAddress: string,
  payment: number
): Promise<void> => {
  await sendTransaction(
    buyerAddress,
    marketplaceContractAddress as string,
    marketplaceContract.methods.buy(tokenId, sellerAddress).encodeABI(),
    parseInt(web3.utils.toWei(String(payment), 'ether') as string)
  );

  console.log(`Collectible (token ID ${tokenId}) is transferred from seller (${sellerAddress}) to buyer.`);
};

/**
 * Seller (or artist) withdraws the payment (and royalty if applicable) from the marketplace.
 *
 * The seller can call this method.
 **/
export const withdrawOutstandingBalance = async (address: string): Promise<void> => {
  await sendTransaction(
    address,
    marketplaceContractAddress as string,
    marketplaceContract.methods.withdrawPayment().encodeABI()
  );

  console.log(`The outstanding balance has been withdrawn to ${address}.`);
};

export const getOutstandingBalance = async (address: string): Promise<string> => {
  const balance = await marketplaceContract.methods.outstandingPayment(address).call();

  const balanceInEther = web3.utils.fromWei(balance, 'ether');

  console.log(`The outstanding balance of ${address} is ${balanceInEther} ETH.`);
  return balance;
};

/**
 * Buyer buys the Drop-of-the-day collectibles.
 * Payment in Ether.
 *
 * Only marketplace owner can call the function
 */
export const dropOfTheDayBuy = async (
  buyerAddress: string,
  tokenId: number,
  sellerAddress: number,
  payment: number
): Promise<void> => {
  await sendTransaction(
    buyerAddress,
    marketplaceContractAddress as string,
    marketplaceContract.methods.dropOfTheDayBuy(tokenId, sellerAddress).encodeABI(),
    parseInt(web3.utils.toWei(String(payment), 'ether'))
  );
};
