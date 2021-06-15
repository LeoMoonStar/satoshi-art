import Web3 from 'web3';
import satoshiMarketplaceABI from './newSmartContracts/SatoshiART1155Marketplace.json';
import tokenContractABI from './newSmartContracts/SatoshiART1155.json';
import { ethers } from 'ethers';
import { getToken } from 'apis/token';
const web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.RPC_URL}`));

const getWeb3Instance = () => {
  return this.web3;
};

const gas = web3.utils.toHex(300000);

const requestMetamaskAccess = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return await ethereum.request({ method: 'eth_requestAccounts' });
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return true;
  } else {
    throw Error('Please install Metamask to proceed');
  }
};

const userBalance = async addr => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(addr);
  const inether = ethers.utils.formatEther(balance);
  return inether;
};
const getMarketplaceContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const networkId = Object.keys(satoshiMarketplaceABI.networks)[0];
  const deployedNetwork = satoshiMarketplaceABI.networks[networkId];
  console.log('contractAddr', deployedNetwork.address);
  const contractInstance = new ethers.Contract(
    process.env.marketplaceContractAddress || deployedNetwork.address,
    satoshiMarketplaceABI.abi,
    provider
  );
  const contractWithSigner = contractInstance.connect(signer);
  return { contractWithSigner, contractInstance };
};

const getTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const networkId = Object.keys(tokenContractABI.networks)[0];
  const deployedNetwork = tokenContractABI.networks[networkId];
  console.log('contractAddr', deployedNetwork.address);
  const contractInstance = new ethers.Contract(
    process.env.tokenContractAddress || deployedNetwork.address,
    tokenContractABI.abi,
    provider
  );
  const contractWithSigner = contractInstance.connect(signer);
  return { contractWithSigner, contractInstance };
};

const txConfirmations = async receipt => {
  const res = await new Promise((resolve, reject) => {
    receipt.on('error', err => {
      reject(err);
    });

    receipt.on('confirmation', (confirmationNumber, receipt) => {
      // For production environment, we should use a larger confirmation number
      if (confirmationNumber > 2) {
        resolve(receipt);
      } else {
        console.log(confirmationNumber);
      }
    });
  });

  return res;
};
//to buy the collectiblw
const marketplaceBuyCollectible = async (tokenId, sellerAddress, price) => {
  const { contractWithSigner, contractInstance } = getMarketplaceContract();
  console.log(contractWithSigner);
  // const balance = await contractInstance.outstandingPayment(sellerAddress);

  // console.log(ethers.utils.formatEther(balance));
  console.log(tokenId, sellerAddress);
  const priceToWei = web3.utils.toWei(price);
  console.log('inwei', priceToWei);
  const receipt = await contractWithSigner.buy(tokenId, sellerAsddress, { value: priceToWei });

  return receipt;
};

//put the item on sale
const marketplacePutOnSaleCollectible = async (tokenId, price) => {
  const { contractWithSigner } = getMarketplaceContract();

  const priceToWei = ethers.utils.parseEther(price);
  console.log(priceToWei);

  const receipt = await contractWithSigner.setListing(
    tokenId,
    '0x01', //0x01 stands for buy/sell
    web3.utils.toWei(String(price), 'ether'),
    0, //startTime is always 0 for buy/sell
    0, //endTime is always 0 for buy/sell
    0, //dropOfTheDayCommission
    false //isDropOfTheDay
  );
  return receipt;
};

//put item onHold/rmeove ffrom sale
const putOnHold = async tokenId => {
  const { contractWithSigner } = getMarketplaceContract();
  const receipt = await contractWithSigner.setListing(
    tokenId,
    '0x00', //0x00 stands for on hold
    0, //price
    0, //startTime
    0, //endTime
    0, //dropOfTheDayCommission
    false //isDropOfTheDay
  );

  console.log(`Collectible (token ID ${tokenId}) is put on hold (no longer available for sale).`);
  return receipt;
};
//marketplace: assigne the drop of the day role to user
const grantDropCreatorRole = async accountAddr => {
  const { contractWithSigner, contractInstance } = getMarketplaceContract();

  const creatorRoleBytes = await contractInstance.DROP_OF_THE_DAY_CREATOR_ROLE();
  const granted = await contractWithSigner.grantRole(creatorRoleBytes, accountAddr);
  granted
    .wait()
    .then(async res => {
      const approval = await contractInstance.hasRole(creatorRoleBytes, accountAddr);
      return approval;
    })
    .catch(err => {
      return err.message;
    });
};

//buy drop of the day collectible
const dropOfTheDayBuy = async (tokenId, sellerAddress, price) => {
  const { contractWithSigner } = getMarketplaceContract();
  const priceToWei = ethers.utils.parseEther(price);

  const response = contractWithSigner.buy(tokenId, sellerAddress, { value: priceToWei });
  return response;
};
/** tokenContract */

//check how many copies user/artist owns of a collectible
const checkTokenBalance = async (artistAddress, tokenId) => {
  const { contractInstance } = getTokenContract();
  console.log(artistAddress, tokenId);
  const tokenBalance = await contractInstance.balanceOf(artistAddress, tokenId);
  console.log(`${artistAddress} owns ${tokenBalance} copies of tokenId - ${tokenId}`);

  const id = web3.utils.hexToNumberString(String(tokenBalance._hex));

  return tokenBalance;
};

//check if user is artist or not
const isApprovedArtist = async artistAddress => {
  const { contractInstance } = getTokenContract();
  console.log(contractInstance);
  console.log(artistAddress);
  const creatorRoleByte = await contractInstance.CREATOR_ROLE();
  console.log(creatorRoleByte);
  const approval = await contractInstance.hasRole(creatorRoleByte, artistAddress);

  console.log(`The creator approval status of artist(${artistAddress}) is ${approval}.`);
  return approval;
};
//assign the artist role only by admin addr
const grantArtistRole = async artistAddress => {
  const { contractInstance, contractWithSigner } = getTokenContract();

  const creatorRoleByte = await contractInstance.CREATOR_ROLE();
  const granted = await contractWithSigner.grantRole(creatorRoleByte, artistAddress);

  granted
    .wait()
    .then(async res => {
      const approval = await contractInstance.hasRole(creatorRoleByte, artistAddress);
      return approval;
    })
    .catch(err => {
      return err.message;
    });
};

const isApprovedForAll = async (address1, address2) => {
  const contract = getTokenContract();

  const result = await contract.methods.isApprovedForAll(address1, address2).call({ from: address1 });
  return result;
};

//create the item
const etherFunctionCreateItem = async (collectibleCount, royalty) => {
  const { contractWithSigner } = getTokenContract();

  const receipt = await contractWithSigner.createItem(collectibleCount, royalty * 100);
  // const res = await txConfirmations(receipt);
  const res = await receipt.wait();
  console.log('res', res);
  console.log(res.logs[0].data);
  const data = res.logs[0].data.substring(194).match(/.{1,64}/g);
  const tokenId = [];

  var i;
  for (i = 0; i < collectibleCount; i++) {
    tokenId.push(parseInt('0x' + data[i]));
  }

  console.log(`The token IDs of created collectibles are ${tokenId}.`);
  return tokenId;
  // const log = await receipt.wait();
  // const ids = log.events[0].args.ids;
  // console.log(ids);

  // const idInString = [];

  // for (let i = 0; i < ids.length; i++) {
  //   const value = ids[i]._hex;
  //   console.log('144', value);
  //   const id = web3.utils.hexToNumberString(String(value));
  //   console.log('num146', id);
  //   idInString.push(id);
  // }
  // return idInString;
};

/**auction contract */
const setAsAuction = async (tokenId, price, startTime, endTime, dropOfTheDayCommission) => {
  const { contractWithSigner } = getMarketplaceContract();
  const receipt = await contractWithSigner.setListing(
    tokenId,
    '0x02', //0x02 stands for auction
    web3.utils.toWei(String(price), 'ether'),
    startTime,
    endTime,
    dropOfTheDayCommission, //dropOfTheDayCommission
    false //isDropOfTheDay
  );
  const response = await receipt.wait();
  console.log(`Collectible (token ID ${tokenId}) is set for auction.`);
  return response;
};

const setAsDropOfTheDayAuction = async (tokenId, price, startTime, endTime, commission) => {
  const { contractWithSigner } = getMarketplaceContract();
  const receipt = await contractWithSigner.setListing(
    tokenId,
    '0x02', //0x02 stands for auction
    web3.utils.toWei(String(price), 'ether'),
    startTime,
    endTime,
    commission, //multiplier is 10000 (i.e. 2.5% -> 250)
    true //isDropOfTheDay
  );
  const response = await receipt.wait();
  console.log(`Collectible (token ID ${tokenId}) is set for auction for
  Drop of The Day.`);
  return response;
};

/**
 * Buyer can bid for the collectible, each new bid has to be higher than the
 * previous highest bid. Ether will be sent with the call and temporarily stored
 * in marketplace until it is overbidden.
 *
 * Anyone can call this method
 **/
const bid = async (tokenId, sellerAddress, payment) => {
  const { contractWithSigner } = getMarketplaceContract();
  const receipt = await contractWithSigner.bid(tokenId, sellerAddress, {
    value: web3.utils.toWei(String(payment), 'ether'),
  });

  const response = await receipt.wait();
  console.log(`Buyer has given the highest bid of ${payment} for collectible (${tokenId}).`);
  return response;
};

/**
 * Same as the withdrawOutstandingBalance method in the buySell.js demo file.
 * Buyer can also use this method to withdraw the bid that was overbidden.
 *
 * The seller can call this method.
 **/
const withdrawOutstandingBalance = async () => {
  const { contractInstance } = getMarketplaceContract();
  const receipt = await contractInstance.withdrawPayment();
  console.log(`The outstanding balance has been withdrawn `);
  return receipt;
};

/**
 * End the auction after the endTime was passed. Transfer the highest bid
 * to the seller and the collectible to the highest bidder.
 *
 * Anyone can call this method.
 */
const auctionEnd = async (tokenId, sellerAddress) => {
  const { contractWithSigner } = getMarketplaceContract();
  const receipt = await contractWithSigner.auctionEnd(tokenId, sellerAddress);
  const response = await receipt.wait();

  console.log(`Auction of collectible ${tokenId} is ended.`);
  return response;
};

/**
 *
 */
const setDropOfTheDayAuctionEndTime = async (tokenId, newEndTime) => {
  const { contractWithSigner } = getMarketplaceContract();
  const receipt = await contractWithSigner.setDropOfTheDayAuctionEndTime(tokenId, newEndTime);
  const response = await receipt.wait();
  console.log(`The new auctionEndTime is set to ${newEndTime}`);
  return response;
};

/**
 * Item owner can call the method to transfer their collectible to
 * another address.
 */
const transferCollectible = async (tokenId, receiverAddress) => {
  const { contractWithSigner } = getMarketplaceContract();
  const receipt = await contractWithSigner.transfer(tokenId, receiverAddress);
  const response = await receipt.wait();
  console.log(`Token ${tokenId} is transferred to ${receiverAddress}`);
  return response;
};
export default {
  getWeb3Instance,
  requestMetamaskAccess,
  marketplaceBuyCollectible,
  marketplacePutOnSaleCollectible,
  grantDropCreatorRole,
  checkTokenBalance,
  isApprovedArtist,
  grantArtistRole,
  isApprovedForAll,
  etherFunctionCreateItem,
  dropOfTheDayBuy,
  setAsAuction,
  setAsDropOfTheDayAuction,
  bid,
  withdrawOutstandingBalance,
  auctionEnd,
  transferCollectible,
  putOnHold,
  userBalance,
};
