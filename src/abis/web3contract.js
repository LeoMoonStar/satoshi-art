import Web3 from 'web3';
import satoshiMarketplaceABI from './SatoshiART1155Marketplace.json';
import tokenContractABI from './SatoshiART1155.json';
import { getToken } from 'apis/token';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/bc7b2cf614a04ab3b4acbcd09a43dc6b'));

const getWeb3Instance = () => {
  return this.web3;
};

const gas = web3.utils.toHex(300000);

// console.log(provider);

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

const marketplacePutOnSaleCollectible = async (tokenId, price, fromAddress) => {
  const { contractWithSigner } = getMarketplaceContract();

  const priceToWei = ethers.utils.parseEther(price);
  console.log(priceToWei);
  const receipt = await contractWithSigner.putOnSale(tokenId, priceToWei);
  return receipt;
};

/** tokenContract */
const checkTokenBalance = async (artistAddress, tokenId) => {
  const { contractInstance } = getTokenContract();
  const tokenBalance = await contractInstance.balanceOf(artistAddress, tokenId);
  console.log(`${artistAddress} owns ${tokenBalance} copies of tokenId - ${tokenId}`);
  return tokenBalance;
};

const isApprovedArtist = async artistAddress => {
  const { contractInstance } = getTokenContract();

    const creatorRoleByte = await contractInstance.CREATOR_ROLE();
    const approval = await contractInstance.hasRole(creatorRoleByte, artistAddress);

    console.log(`The creator approval status of address(${artistAddress}) is ${approval}.`);

    return approval;

};
const grantRole = async (artistAddress, adminAddress) => {
  const { contractInstance } = getTokenContract();

  const creatorRoleByte = await contractInstance.CREATOR_ROLE().call();
  const granted = await contractInstance
    .grantRole(creatorRoleByte, artistAddress)
    .call({ from: '0x37eFfFd3894cE8D6c8F67629f60B86505407aA29' });

  const approval = await contractInstance.hasRole(creatorRoleByte, artistAddress).call();
  return granted;
};
const isApprovedForAll = async (address1, address2) => {
  const contract = getTokenContract();

  const result = await contract.methods.isApprovedForAll(address1, address2).call({ from: address1 });
  return result;
};
// const tokenContractCreateItem = async (collectibleCount, royalty, fromAddress) => {
//   // const contract = getTokenContract();
//   const networkId = Object.keys(tokenContractABI.networks)[0];
//   const deployedNetwork = tokenContractABI.networks[networkId];
//   console.log(deployedNetwork);
//   const contract = new web3.eth.Contract(tokenContractABI.abi, deployedNetwork && deployedNetwork.address);

//   const provider = await detectEthereumProvider();
//   console.log(contract.methods.createItem(collectibleCount, royalty));
//   console.log(collectibleCount, royalty, fromAddress);
//   const transactionParameters = {
//     from: fromAddress,
//     gas: gas, // 30400
//     data: contract.methods.createItem(collectibleCount, royalty).encodeABI(),
//   };

//   if (provider) {
//     console.log(provider.isConnected());
//     const result = await provider.request({
//       method: 'eth_sendTransaction',
//       params: [transactionParameters],
//     });
//     return result;
//   } else {
//     alert('Please connect with metamask first.');
//   }
//   // return contract.methods.createItem(collectibleCount, royalty).send({ from: fromAddress, gas: gas });
// };

const etherFunctionCreateItem = async (collectibleCount, royalty) => {
  const { contractWithSigner } = getTokenContract();

  const receipt = await contractWithSigner.createItem(collectibleCount, royalty);
  const log = await receipt.wait();
  const ids = log.events[0].args.ids;
  console.log(ids);
  const BN = web3.utils.BN;
  const idInString = [];

  for (let i = 0; i < ids.length; i++) {
    const value = ids[i]._hex;
    console.log('144', value);
    const id = new BN(value.toString()).toString();
    idInString.push(id);
  }
  return idInString;
};

export default {
  getWeb3Instance,
  requestMetamaskAccess,
  marketplaceBuyCollectible,
  marketplacePutOnSaleCollectible,
  checkTokenBalance,

  isApprovedArtist,
  grantRole,
  isApprovedForAll,
  etherFunctionCreateItem,
};

// privateKey_admin:
//     "aa99b53179487fff65b145b5a8f939c815a6b130aa6a5ce3fa223d5a6ed16407",
//   address_admin: "0x37eFfFd3894cE8D6c8F67629f60B86505407aA29",
//   privateKey_dropOfTheDayCreator:
//     "aa99b53179487fff65b145b5a8f939c815a6b130aa6a5ce3fa223d5a6ed16407",
//   address_dropOfTheDayCreator: "0x37eFfFd3894cE8D6c8F67629f60B86505407aA29",
//   privateKey_artist1:
//     "293a001c3d0d203e7005d76d8e432193d6400fc245bb1a948e589dbf44bd6be0",
//   address_artist1: "0xF42f3440594434EE7405b8Bacd04FF683797EA8b",
//   privateKey_buyer1:
//     "03f04401a43e1316e410d0ff8e6b40cd4fe47dfcefe9479c66c1e8e2de422096",
//   address_buyer1: "0x8a3AE0687966A9cF5Bf84675C0D2823CECda525B",
