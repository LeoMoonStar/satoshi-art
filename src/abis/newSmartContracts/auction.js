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
 * 1. Regular Auction Process
 * - Artist or collectible owner list a collectible  to make it ready for auction
 * - Buyers can bid for the item after auction started
 * - The bid that was overbidden will be returned to the buyer (buyer needs
 * to withdraw the ether themselves for security reason)
 * - When the endtime is passed, anyone can call the auctionEnd method
 * to end the auction. The collectible will be transferred to the highest
 * bidder. The highest bid is transferred to owner's account to be withdrawn.
 *
 * 2. Drop of the Day Auction Process
 * - The drop of the day creator create a collectible, or get a collectible transferred
 * to them
 * - The approved drop of the day creator list a collectible for drop of the day auction
 * - Buyers can bid for the item after auction started
 * - The bid that was overbidden will be returned to the buyer (buyer needs
 * to withdraw the ether themselves for security reason)
 * - If a bid came in during the last 10 min of the auction, the drop of the day
 * creator needs to call setDropOfTheDayAuctionEndTime method to extend the
 * auction endtime.
 * - When the endtime is passed, anyone can call the auctionEnd method
 * to end the auction. The collectible will be transferred to the highest
 * bidder. The highest bid is transferred to owner's account to be withdrawn.
 *
 */

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

/**
 * Seller put the collectible on the marketplace for auction.
 * The price is in ether. start and endTime are unix time.
 *
 * The current owner (seller) of the collectible can call this method.
 **/
const setAsAuction = async (
  sellerPrivateKey,
  tokenId,
  price,
  startTime,
  endTime
) => {
  await sendTransaction(
    sellerPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setListing(
        tokenId,
        "0x02", //0x02 stands for auction
        web3.utils.toWei(String(price), "ether"),
        startTime,
        endTime,
        0, //dropOfTheDayCommission
        false //isDropOfTheDay
      )
      .encodeABI()
  );

  console.log(`Collectible (token ID ${tokenId}) is set for auction.`);
};

/**
 * Marketplace admin put the collectible on the marketplace for auction.
 * The price is in ether. start and endTime are unix time.
 *
 * Only marketplace admin can call this method.
 **/
const setAsDropOfTheDayAuction = async (
  dropOfTheDayCreatorPrivateKey,
  tokenId,
  price,
  startTime,
  endTime,
  commission
) => {
  await sendTransaction(
    dropOfTheDayCreatorPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setListing(
        tokenId,
        "0x02", //0x02 stands for auction
        web3.utils.toWei(String(price), "ether"),
        startTime,
        endTime,
        commission, //multiplier is 10000 (i.e. 2.5% -> 250)
        true //isDropOfTheDay
      )
      .encodeABI()
  );

  console.log(`Collectible (token ID ${tokenId}) is set for auction for
  Drop of The Day.`);
};

/**
 * Buyer can bid for the collectible, each new bid has to be higher than the
 * previous highest bid. Ether will be sent with the call and temporarily stored
 * in marketplace until it is overbidden.
 *
 * Anyone can call this method
 **/
const bid = async (buyerPrivateKey, tokenId, sellerAddress, payment) => {
  await sendTransaction(
    buyerPrivateKey,
    config.marketplaceContractAddress,
    marketplaceContract.methods.bid(tokenId, sellerAddress).encodeABI(),
    web3.utils.toWei(String(payment), "ether")
  );

  console.log(
    `Buyer ${
      web3.eth.accounts.privateKeyToAccount(buyerPrivateKey).address
    }) has given the highest bid of ${payment} for collectible (${tokenId}).`
  );
};

/**
 * Same as the withdrawOutstandingBalance method in the buySell.js demo file.
 * Buyer can also use this method to withdraw the bid that was overbidden.
 *
 * The seller can call this method.
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
 * End the auction after the endTime was passed. Transfer the highest bid
 * to the seller and the collectible to the highest bidder.
 *
 * Anyone can call this method.
 */
const auctionEnd = async (tokenId, sellerAddress) => {
  await sendTransaction(
    config.privateKey_admin,
    config.marketplaceContractAddress,
    marketplaceContract.methods.auctionEnd(tokenId, sellerAddress).encodeABI()
  );

  console.log(`Auction of collectible ${tokenId} is ended.`);
};

/**
 *
 */
const setDropOfTheDayAuctionEndTime = async (tokenId, newEndTime) => {
  await sendTransaction(
    config.privateKey_dropOfTheDayCreator,
    config.marketplaceContractAddress,
    marketplaceContract.methods
      .setDropOfTheDayAuctionEndTime(tokenId, newEndTime)
      .encodeABI()
  );

  console.log(`The new auctionEndTime is set to ${newEndTime}`);
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

const run = async () => {
  const tokenId = await createCollectible(
    config.privateKey_artist1,
    2,
    1000 // royalty ranges from 0 to 1000, corresponding to 0% to 10%
  );

  /**
   * Regular auction
   */
  await setAsAuction(
    config.privateKey_artist1,
    tokenId[0],
    0.01,
    1623095538,
    1623096318
  );
  await bid(config.privateKey_buyer1, 9, config.address_artist1, 0.01);
  await withdrawOutstandingBalance(config.privateKey_buyer1);
  await bid(config.privateKey_buyer2, 9, config.address_artist1, 0.02);
  await auctionEnd(9, config.address_artist1);
  await withdrawOutstandingBalance(config.privateKey_artist1);

  /**
   * Drop of the day auction
   */
  await transferCollectible(
    config.privateKey_artist1,
    tokenId[1],
    config.address_dropOfTheDayCreator
  );
  await setAsDropOfTheDayAuction(
    config.privateKey_dropOfTheDayCreator,
    tokenId[1],
    0.01,
    1623097878,
    1623097998,
    350
  );
  await bid(
    config.privateKey_buyer1,
    tokenId[1],
    config.address_dropOfTheDayCreator,
    0.01
  );
  await withdrawOutstandingBalance(config.privateKey_buyer1);
  await bid(
    config.privateKey_buyer2,
    tokenId[1],
    config.address_dropOfTheDayCreator,
    0.02
  );
  await setDropOfTheDayAuctionEndTime(tokenId[1], 1622584063);
  await auctionEnd(tokenId[1], config.address_dropOfTheDayCreator);
  await withdrawOutstandingBalance(config.privateKey_dropOfTheDayCreator);
};

run()
  .then((_) => {})
  .catch((err) => console.log(err));
