const { config } = require("./config");
const Web3 = require("web3");
const tokenContractBuildJSON = require("./SatoshiART1155.json");
const marketplaceContractBuildJSON = require("./SatoshiART1155Marketplace.json");

const web3 = new Web3(config.rpcURL);

const marketplaceContractAbi = marketplaceContractBuildJSON.abi;
const marketplaceContract = new web3.eth.Contract(
  marketplaceContractAbi,
  config.marketplaceContractAddress
);

const tokenContractAbi = tokenContractBuildJSON.abi;
const tokenContract = new web3.eth.Contract(
  tokenContractAbi,
  config.tokenContractAddress
);

const sendTransaction = async (
  fromKey,
  to,
  abiEncoding,
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

  const signedTx = await web3.eth.accounts
    .signTransaction(txData, fromKey)
    .then((res) => res);

  const tx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  const res = await new Promise((resolve, reject) => {
    tx.once("error", (err) => {
      reject(err);
    });

    tx.on("confirmation", (confirmationNumber, receipt) => {
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

/**
 * Approve an user as an artist so he can create collectible.
 *
 * Only SatoshiART1155 admin can call this method.
 * This is a testing contract and it's subject to frequent changes.
 **/
const createApprovedArtist = async (artistAddress) => {
  const creatorRoleByte = await tokenContract.methods.CREATOR_ROLE().call();
  await sendTransaction(
    config.privateKey_admin,
    config.tokenContractAddress,
    tokenContract.methods.grantRole(creatorRoleByte, artistAddress).encodeABI()
  );
};

/**
 * Check if an address is approved to create collectible.
 *
 * Anyone can call this method.
 **/
const isApprovedArtist = async (artistAddress) => {
  const creatorRoleByte = await tokenContract.methods.CREATOR_ROLE().call();

  const approval = await tokenContract.methods
    .hasRole(creatorRoleByte, artistAddress)
    .call();

  console.log(
    `The creator approval status of address(${artistAddress}) is ${approval}.`
  );
  return approval;
};

/**
 * Approve an user to be able to create drop of the day event
 *
 * Only SatoshiART1155 admin can call this method.
 **/
const createDropOfTheDayCreator = async (dropOfTheDayCreatorAddress) => {
  const dropOfTheDayCreatorRoleByte = await marketplaceContract.methods
    .DROP_OF_THE_DAY_CREATOR_ROLE()
    .call();
  await sendTransaction(
    config.privateKey_admin,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .grantRole(dropOfTheDayCreatorRoleByte, dropOfTheDayCreatorAddress)
      .encodeABI()
  );
  console.log(`The creator ${dropOfTheDayCreatorAddress} is set as drop of the day 
  creator`);
};

/**
 * Check if an address is approved to create drop of the day event
 *
 * Anyone can call this method.
 * This is a testing contract and it's subject to frequent changes.
 **/
const isApprovedDropOfTheDayCreator = async (dropOfTheDayCreatorAddress) => {
  const dropOfTheDayCreatorRoleByte = await marketplaceContract.methods
    .DROP_OF_THE_DAY_CREATOR_ROLE()
    .call();

  const approval = await marketplaceContract.methods
    .hasRole(dropOfTheDayCreatorRoleByte, dropOfTheDayCreatorAddress)
    .call();

  console.log(
    `The dropOfTheDayCreator approval status of address(${dropOfTheDayCreatorAddress}) is ${approval}.`
  );
  return approval;
};

/**
 * Set an address to be commission receiver.
 *
 * Caller has to be marketplace admin
 */
const setCommissionReceiver = async (commissionReceiverAddress) => {
  await sendTransaction(
    config.privateKey_admin,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setCommissionReceiver(commissionReceiverAddress)
      .encodeABI()
  );

  console.log(`${commissionReceiverAddress} is set as commission receiver`);
};

/**
 * Get current commission receiver address.
 *
 * Anyone can call this method.
 **/
const commissionReceiver = async () => {
  const commissionReceiver = await marketplaceContract.methods
    .commissionReceiver()
    .call();

  console.log(`The current commission receiver is (${commissionReceiver}).`);
};

/**
 * Default commission is 2.5%. Marketplace admin can call the method
 * to modify the commission.
 * @param {*} commission: multiplier is 10000. i.e. 2.5% is 250

 * Caller has to be marketplace admin
 */
const setDefaultCommission = async (commission) => {
  await sendTransaction(
    config.privateKey_admin,
    config.marketplaceContractAddress,
    marketplaceContract.methods.setDefaultCommission(commission).encodeABI()
  );

  console.log(`Default commission is changed to ${commission}.`);
};

/**
 * Get current default commission.
 *
 * Anyone can call this method.
 **/
const defaultCommission = async () => {
  const commission = await marketplaceContract.methods
    .defaultCommission()
    .call();

  console.log(
    `The current marketplace default commission for buy/sell is (${commission}).`
  );
};

/**
 * Default auction commission is 2.5%. Marketplace admin can call the method
 * to modify the commission.
 * @param {*} commission: multiplier is 10000. i.e. 2.5% is 250

 * Caller has to be marketplace admin
 */
const setDefaultAuctionCommission = async (commission) => {
  await sendTransaction(
    config.privateKey_admin,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setDefaultAuctionCommission(commission)
      .encodeABI()
  );

  console.log(`Default auction commission is changed to ${commission}.`);
};

/**
 * Get current default auction commission.
 *
 * Anyone can call this method.
 **/
const defaultAuctionCommission = async () => {
  const commission = await marketplaceContract.methods
    .defaultAuctionCommission()
    .call();

  console.log(
    `The current marketplace default commission for auction is (${commission}).`
  );
};

/**
 * Add an address to be marketplace admin.
 *
 * Only current admin can call the function
 */
const set1155Admin = async (address) => {
  const defaultAdminRoleByte = await tokenContract.methods
    .DEFAULT_ADMIN_ROLE()
    .call();

  await sendTransaction(
    config.privateKey_admin,
    config.tokenContractAddress,
    tokenContract.methods.grantRole(defaultAdminRoleByte, address).encodeABI()
  );

  const res = await tokenContract.methods
    .hasRole(defaultAdminRoleByte, address)
    .call();

  console.log(`${address} is set as new 1155 token contract admin. ${res}`);
};

/**
 * Add an address to be marketplace admin.
 *
 * Only current admin can call the function
 */
const setMarketplaceAdmin = async (address) => {
  const defaultAdminRoleByte = await marketplaceContract.methods
    .DEFAULT_ADMIN_ROLE()
    .call();

  await sendTransaction(
    config.privateKey_admin,
    config.marketplaceContractAddress,
    tokenContract.methods.grantRole(defaultAdminRoleByte, address).encodeABI()
  );

  const res = await marketplaceContract.methods
    .hasRole(defaultAdminRoleByte, address)
    .call();

  console.log(`${address} is set as new marketplace admin. ${res}`);
};

const run = async () => {
  /**
   * creator
   */
  await createApprovedArtist(config.address_artist1);
  await isApprovedArtist(config.address_artist1);
  await createDropOfTheDayCreator(config.address_dropOfTheDayCreator);
  await isApprovedDropOfTheDayCreator(config.address_dropOfTheDayCreator);

  /**
   * commission
   */
  await setCommissionReceiver(config.address_admin);
  await commissionReceiver();
  await setDefaultCommission(250);
  await setDefaultAuctionCommission(250);

  /**
   * 1155 admin
   */
  await set1155Admin(config.address_dropOfTheDayCreator);
  /**
   * marketplace admin
   */
  await setMarketplaceAdmin(config.address_dropOfTheDayCreator);
};

run()
  .then((_) => {})
  .catch((err) => console.log(err));
