import Web3 from 'web3';
import satoshiMarketplaceABI from './SatoshiART1155Marketplace.json';
import tokenContractABI from './SatoshiART1155.json';
import { ethers } from 'ethers';
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

const getMarketplaceContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const networkId = Object.keys(satoshiMarketplaceABI.networks)[0];
  const deployedNetwork = satoshiMarketplaceABI.networks[networkId];
  const contractInstance = new ethers.Contract(deployedNetwork.address, satoshiMarketplaceABI.abi, provider);
  const contractWithSigner = contractInstance.connect(signer);
  return { contractWithSigner, contractInstance };
};

const getTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const networkId = Object.keys(tokenContractABI.networks)[0];
  const deployedNetwork = tokenContractABI.networks[networkId];
  const contractInstance = new ethers.Contract(deployedNetwork.address, tokenContractABI.abi, provider);
  const contractWithSigner = contractInstance.connect(signer);
  return { contractWithSigner, contractInstance };
};

//to buy the collectiblw
const marketplaceBuyCollectible = async (tokenId, sellerAddress, price) => {
  const { contractWithSigner, contractInstance } = getMarketplaceContract();
  console.log(contractWithSigner);
  const balance = await contractInstance.outstandingPayment(sellerAddress);

  console.log(ethers.utils.formatEther(balance));
  console.log(tokenId, sellerAddress);
  const priceToWei = ethers.utils.parseEther(price);
  console.log(priceToWei);
  const receipt = await contractWithSigner.buy(tokenId, sellerAddress, { value: priceToWei });

  return receipt;
};

//put the item on sale
const marketplacePutOnSaleCollectible = async (tokenId, price, fromAddress) => {
  const { contractWithSigner } = getMarketplaceContract();

  const priceToWei = ethers.utils.parseEther(price);
  console.log(priceToWei);
  const receipt = await contractWithSigner.putOnSale(tokenId, priceToWei);
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
const dropOfTheDayBuy = async (buyerAddress, tokenId, sellerAddress, price) => {
  const { contractWithSigner } = getMarketplaceContract();
  const priceToWei = ethers.utils.parseEther(price);
  const response = contractWithSigner.dropOfTheDayBuy(tokenId, sellerAddress, { value: priceToWei });
  return;
};
/** tokenContract */

//check how many copies user/artist owns of a collectible
const checkTokenBalance = async (artistAddress, tokenId) => {
  const { contractInstance } = getTokenContract();
  const tokenBalance = await contractInstance.balanceOf(artistAddress, tokenId);
  console.log(`${artistAddress} owns ${tokenBalance} copies of tokenId - ${tokenId}`);
  return tokenBalance;
};

//check if user is artist or not
const isApprovedArtist = async artistAddress => {
  const { contractInstance } = getTokenContract();

  const creatorRoleByte = await contractInstance.CREATOR_ROLE();
  const approval = await contractInstance.hasRole(creatorRoleByte, artistAddress);

  console.log(`The creator approval status of address(${artistAddress}) is ${approval}.`);
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

  const receipt = await contractWithSigner.createItem(collectibleCount, royalty);
  const log = await receipt.wait();
  const ids = log.events[0].args.ids;
  console.log(ids);

  const idInString = [];

  for (let i = 0; i < ids.length; i++) {
    const value = ids[i]._hex;
    console.log('144', value);
    const id = web3.utils.hexToNumberString(String(value));
    console.log('num146', id);
    idInString.push(id);
  }
  return idInString;
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
};
