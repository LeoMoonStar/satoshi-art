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
 *
 * 1. Creation Process
 * - Validate whether the user is an approved artist by isApprovedArtist()
 * - Creat the item on blokchain by createCollectible()
 * - Get the tokenId from the previous step
 * - Call our backend API to store the newly created item in our database
 *
 * 2. Buy/Sell Process
 * - List an item to make it tradeable by putOnSale()
 * - To buy a listed item - call buy()
 *
 * 3. Drop of the day buy/sell process
 * - Approve an user to be drop of the day creator
 * - Drop of the day creator either mint a new collectible or get it transferred from someone
 *    using transferCollectible()
 * - List a collectible to make it tradeable by setAsDropOfTheDay()
 *
 * 4. Commission
 * - The commission receiver can
 */

/**
 * Check if artist is approved to create collectible.
 *
 * Anyone can call this method.
 * This is a testing contract and it's subject to frequent changes.
 **/
const isApprovedArtist = async (artistAddress) => {
  const creatorRoleByte = await tokenContract.methods.CREATOR_ROLE().call();

  const approval = await tokenContract.methods
    .hasRole(creatorRoleByte, artistAddress)
    .call();

  console.log(
    `The creator approval status of artist(${artistAddress}) is ${approval}.`
  );
  return approval;
};

/**
 * Creat Collectible Example. The multiplier of royalty is 10000 (i.e. 10% -> 1000)
 *
 * Only approved artist addresses can call this method.
 *
 * To add more testing artist, please contact lucas.pan@fintelics.com.
 **/
const createCollectible = async (
  artistPrivateKey,
  collectibleCount,
  royalty // royalty ranges from 0 to 1000, corresponding to 0% to 10%
) => {
  const res = await sendTransaction(
    artistPrivateKey,
    config.tokenContractAddress,
    tokenContract.methods.createItem(collectibleCount, royalty).encodeABI(),
    (value = 0),
    (gas = 500000)
  );

  const data = res.logs[0].data.substring(194).match(/.{1,64}/g);
  const tokenId = [];

  var i;
  for (i = 0; i < collectibleCount; i++) {
    tokenId.push(parseInt("0x" + data[i]));
  }

  console.log(`The token IDs of created collectibles are ${tokenId}.`);
  return tokenId;
};

const checkTokenBalance = async (artistAddress, tokenId) => {
  const tokenBalance = await tokenContract.methods
    .balanceOf(artistAddress, tokenId)
    .call();

  console.log(
    `${artistAddress} owns ${tokenBalance} copies of tokenId - ${tokenId}`
  );
  return tokenId;
};

/**
 * Seller put the collectible on the marketplace to sell.
 * The price is in ether.
 *
 * The current owner (seller) of the collectible can call this method.
 **/
const putOnSale = async (sellerPrivateKey, tokenId, price) => {
  await sendTransaction(
    sellerPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setListing(
        tokenId,
        "0x01", //0x01 stands for buy/sell
        web3.utils.toWei(String(price), "ether"),
        0, //startTime is always 0 for buy/sell
        0, //endTime is always 0 for buy/sell
        0, //dropOfTheDayCommission
        false //isDropOfTheDay
      )
      .encodeABI()
  );

  console.log(
    `Collectible (token ID ${tokenId}) is put on the marketplace to sell.`
  );
};

/**
 * Buyer buys the collectible from seller. Ether is transferred to the marketplace.
 * Commission and royalty are automatically calculated.
 * The payment is in ether.
 *
 * The buyer can call this method.
 **/
const buy = async (buyerPrivateKey, tokenId, sellerAddress, payment) => {
  await sendTransaction(
    buyerPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods.buy(tokenId, sellerAddress).encodeABI(),
    web3.utils.toWei(String(payment), "ether")
  );

  console.log(
    `Collectible (token ID ${tokenId}) is transferred from seller (${sellerAddress}) to buyer ${
      web3.eth.accounts.privateKeyToAccount(buyerPrivateKey).address
    }.`
  );
};

/**
 * Seller (or artist) withdraws the payment (and royalty if applicable) from
 * the marketplace.
 *
 * Anyone can call this method to withdraw their balance in the marketplace.
 **/
const withdrawOutstandingBalance = async (privateKey) => {
  await sendTransaction(
    privateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods.withdrawPayment().encodeABI()
  );

  console.log(
    `The outstanding balance has been withdrawn to ${
      web3.eth.accounts.privateKeyToAccount(privateKey).address
    }.`
  );
};

/**
 * Anyone can call this method to check there ether balance in the
 * marketplace contract.
 **/
const getOutstandingBalance = async (address) => {
  const balance = await marketplaceContract.methods
    .outstandingPayment(address)
    .call();

  const balanceInEther = web3.utils.fromWei(balance, "ether");

  console.log(
    `The outstanding balance of ${address} is ${balanceInEther} ETH.`
  );
  return balance;
};

/**
 * Commission receiver can call this method to withdraw the commission
 * balance.
 *
 * Only commission receiver (set by admin) can call this method.
 **/
const withdrawMarketplaceBalance = async (commissionReceiverPrivateKey) => {
  await sendTransaction(
    commissionReceiverPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods.withdrawPayment().encodeABI()
  );

  console.log(
    `The commission has been withdrawn to ${
      web3.eth.accounts.privateKeyToAccount(commissionReceiverPrivateKey)
        .address
    }.`
  );
};

/**
 * Item owner can call the method to transfer their collectible to
 * another address.
 */
const transferCollectible = async (
  ownerPrivateKey,
  tokenId,
  receiverAddress
) => {
  await sendTransaction(
    ownerPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods.transfer(tokenId, receiverAddress).encodeABI()
  );

  console.log(
    `Token ${tokenId} is transferred from ${
      web3.eth.accounts.privateKeyToAccount(ownerPrivateKey).address
    } to ${receiverAddress}`
  );
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
 * Marketplace set collectible to be ready to sell on the Drop of the Day.
 * Price in ether.
 * @param {*} startTime > current time. Unix time
 * @param {*} endTime > startTime. Unix time
 * @param {*} dropOfTheDayCommission is subject to change, maximum 30% (3000).
 *
 * Only marketplace owner can call this method
 */
const setAsDropOfTheDay = async (
  dropOfTheDayCreatorPrivateKey,
  tokenId,
  price,
  startTime, // Need to use UnixTime e.g. Math.floor(new Date().getTime() / 1000)
  endTime, // Need to use UnixTime e.g. Math.floor(new Date().getTime() / 1000)
  dropOfTheDayCommission // Commission ranges from 0 to 3000, corresponding to 0% to 30%
) => {
  await sendTransaction(
    dropOfTheDayCreatorPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setListing(
        tokenId,
        "0x01", //0x01 stands for buy/sell
        web3.utils.toWei(String(price), "ether"),
        startTime,
        endTime,
        dropOfTheDayCommission,
        true // isDropOfTheDay
      )
      .encodeABI()
  );

  console.log(`Collectible (token ID ${tokenId}) is set as Drop of The Day.`);
};

/**
 * Buyer buys the Drop-of-the-day collectibles.
 * Payment in Ether.
 *
 * Only marketplace owner can call the method
 */
const dropOfTheDayBuy = async (
  buyerPrivateKey,
  sellerAddress,
  tokenId,
  payment
) => {
  await sendTransaction(
    buyerPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods.buy(tokenId, sellerAddress).encodeABI(),
    web3.utils.toWei(String(payment), "ether")
  );

  console.log(
    `Drop of the day collectible (token ID ${tokenId}) is transferred from seller (${sellerAddress}) to buyer ${
      web3.eth.accounts.privateKeyToAccount(buyerPrivateKey).address
    }.`
  );
};

/**
 * Seller remove the collectible from the market.
 *
 * The current owner (seller) of the collectible can call this method.
 **/
const putOnHold = async (sellerPrivateKey, tokenId) => {
  await sendTransaction(
    sellerPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setListing(
        tokenId,
        "0x00", //0x00 stands for on hold
        0, //price
        0, //startTime
        0, //endTime
        0, //dropOfTheDayCommission
        false //isDropOfTheDay
      )
      .encodeABI()
  );

  console.log(
    `Collectible (token ID ${tokenId}) is put on hold (no longer available for sale).`
  );
};

/**
 * Marketplace remove the collectible from the Drop of the Day listing.
 *
 * Only marketplace owner can call the method
 */
const putOnHoldDropOfTheDay = async (
  dropOfTheDayCreatorPrivateKey,
  tokenId
) => {
  await sendTransaction(
    dropOfTheDayCreatorPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setListing(
        tokenId,
        "0x00", //0x00 stands for on hold
        0, //price
        0, //startTime
        0, //endTime
        0, //commission
        false //isDropOfTheDay
      )
      .encodeABI()
  );

  console.log(
    `Collectible (token ID ${tokenId}) is put on hold (no longer available for sale on Drop of the day).`
  );
};

/**
 * Check the listing status of the collectible.
 * 0: status: status,
   1: price: price,
   2: startTime: startTime,
   3: endTime: endTime,
   4: commission: _defaultCommission,
   5: isDropOfTheDay: false,
   6: highestBidder: address(0),
   7: highestBid: 0,
 *
 * Anyone can call this method
 */
const collectibleStatus = async (ownerAddress, tokenId) => {
  const listing = await marketplaceContract.methods
    .listingOf(ownerAddress, tokenId)
    .call();

  console.log(
    `The status of collectible ${tokenId} is ${listing[0]}. Is it for drop of the day? ${listing[5]}`
  );
};

const run = async () => {
  /**
   * regular buy/sell
   */
  await isApprovedArtist(config.address_artist1);
  const tokenId = await createCollectible(
    config.privateKey_artist1,
    4,
    1000 // royalty ranges from 0 to 1000, corresponding to 0% to 10%
  );
  await checkTokenBalance(config.address_artist1, tokenId[0]);
  await putOnSale(config.privateKey_artist1, tokenId[0], 0.01);
  await buy(config.privateKey_buyer1, tokenId[0], config.address_artist1, 0.01);
  await getOutstandingBalance(config.address_artist1);
  await withdrawOutstandingBalance(config.privateKey_artist1);
  await collectibleStatus(config.address_artist1, tokenId[0]);
  await withdrawMarketplaceBalance(config.privateKey_admin);
  /**
   * drop of the day
   *
   * Drop of the day creator can ether be an approved artist to create
   * collectible, or have the owner to transfer collectible to them
   */
  await transferCollectible(
    config.privateKey_artist1,
    tokenId[1],
    config.address_dropOfTheDayCreator
  );
  await isApprovedDropOfTheDayCreator(config.address_dropOfTheDayCreator);
  await setAsDropOfTheDay(
    config.privateKey_dropOfTheDayCreator,
    tokenId[1],
    0.01,
    1623093618, // Need to use UnixTime e.g. Math.floor(new Date().getTime() / 1000)
    1623094818, // Need to use UnixTime e.g. Math.floor(new Date().getTime() / 1000)
    500 // Commission ranges from 0 to 3000, corresponding to 0% to 30%
  );
  await collectibleStatus(config.address_dropOfTheDayCreator, tokenId[1]);
  await dropOfTheDayBuy(
    config.privateKey_buyer1,
    config.address_dropOfTheDayCreator,
    tokenId[1],
    0.01
  );
  await withdrawOutstandingBalance(config.privateKey_artist1); // withdraw royalty
  await withdrawOutstandingBalance(config.privateKey_dropOfTheDayCreator); // withdraw payment
  await collectibleStatus(config.address_artist1, tokenId[1]);
  await withdrawMarketplaceBalance(config.privateKey_admin); // withdraw commission
  /**
   * put on hold
   */
  await putOnSale(config.privateKey_artist1, tokenId[2], 0.01);
  await putOnHold(config.privateKey_artist1, tokenId[2]);
  await collectibleStatus(config.address_artist1, tokenId[2]);
  await transferCollectible(
    config.privateKey_artist1,
    tokenId[3],
    config.address_dropOfTheDayCreator
  );
  await setAsDropOfTheDay(
    config.privateKey_dropOfTheDayCreator,
    tokenId[3],
    0.01,
    1622556043, // Need to use UnixTime e.g. Math.floor(new Date().getTime() / 1000)
    1622728843, // Need to use UnixTime e.g. Math.floor(new Date().getTime() / 1000)
    500 // Commission ranges from 0 to 3000, corresponding to 0% to 30%
  );
  await putOnHoldDropOfTheDay(
    config.privateKey_dropOfTheDayCreator,
    tokenId[3]
  );
  await collectibleStatus(config.address_dropOfTheDayCreator, tokenId[3]);
};

run()
  .then((_) => {})
  .catch((err) => console.log(err));
