import React, { useState, useEffect } from 'react';

import moment from 'moment';

import axios from 'axios';
import { styled, Grid, Typography, IconButton, Tab, Tabs, Theme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import text from '../../../constants/content';
import {
  ExpandIcon,
  GreySaveIcon,
  GreySavedIcon,
  ViewsIcon,
  LikeIcon,
  LikedIcon,
  SaveIcon,
  DotsIcon,
} from 'components/icons';
import Button from 'components/button';
import {convertStringToNumber} from 'utils/helpers';
import Loader from 'components/widgets/Loader';
import { VALID_VIDEO_TYPES, VALID_AUDIO_TYPES } from 'constants/supportedFileTypes';
import Popup from 'components/widgets/Popup';
import {
  getCollectible,
  getCollection,
  getCollectibles,
  CollectibleInfo,
  getHistory,
  likeCollectible,
  dislikeCollectible,
  thumbsupCollectible,
  thumbsdownCollectible,
  getCollectibleThumbs,
  getCollectibleLikes,
  getAuctionHistory,
} from 'apis/collectibles';
import { getUserInfo } from 'apis/users';
import { readCookie } from 'apis/cookie';
import { Info } from './Info';
import { History } from './History';
import BidModal from './BidModal';
import BuyModal from './BuyModal';
import FSModal from './FSModal';
import useStyles from './TokenDetails.style';
import ProgressModal from './ProgressModal';
import Price from 'components/widgets/Price';
import { TokenType } from 'state/transactions/actions';
import { SERVICE_FEE } from 'constants/common';
import { useIsCollectibleOwned } from 'utils/common';
import { getEthPrice } from 'apis/ethPrice';

import web3Contract from "abis/web3contract";

const toHumanDate = (numberDate : string) => {
  return new Date(new Date(parseInt(numberDate))).toLocaleString()
}
import web3 from 'web3';

const IconWrapper = styled(Grid)(({ dots, theme }: { dots?: boolean; theme: Theme }) => ({
  width: dots ? 82 : 40,
  height: 40,
  marginRight: dots ? 0 : 13,
  backgroundColor: `${theme.custom.common.blackColor}80`,
  borderRadius: 20,
  display: 'flex',
}));

const InfoIconWrapper = styled(Grid)(({ lastIcon }: { lastIcon?: boolean }) => ({
  display: 'flex',
  marginRight: lastIcon ? 0 : 30,
}));

enum TabVariants {
  INFO = 0,
  OWNERS = 1,
  HISTORY = 2,
  BIDS = 3,
}

const tabs = [
  {
    label: 'Info',
    value: TabVariants.INFO,
  },
  /*{
        label: 'Owners',
        value: TabVariants.OWNERS,
    },*/
  {
    label: 'History',
    value: TabVariants.HISTORY,
  },
  {
    label: 'Bids',
    value: TabVariants.BIDS,
  },
];
const TokenDetails = (): JSX.Element => {
  const [tab, selectTab] = useState(TabVariants.INFO);
  const [isBidModal, setIsBidModal] = useState<boolean>(false);
  const [isBuyModal, setIsBuyModal] = useState<boolean>(false);
  const [isFSModal, setFSModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [collectible, setCollectible] = useState<CollectibleInfo>();
  const [bidStartTime, setBidStartTime] = useState("");
  const [bidEndTime, setBidEndTime] = useState("");
  const [isBuyProgressModal, setIsBuyProgressModal] = useState<boolean>(false);
  const [isBidProgressModal, setIsBidProgressModal] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const userId = readCookie('id');
  const classes = useStyles();
  const [userCollectibles, setUserCollectibles] = useState([]);
  const [info, setInfo] = useState([]);

  const [auctionInfo, setAuctionInfo] = useState([]);
  const [auctionHistory, setAuctionHistory] = useState([]);
  const [bidValue, setBidValue] = useState(0);
  const [collection, setCollection] = useState({
    name: '',
    avatarUrl: '',
  });
  const [history, setHistory] = useState([]);
  const [numCopies, setNumCopies] = useState('1');
  const [typeShow, setTypeShow] = useState('Info');
  const [numThumbs, setNumThumbs] = useState(0);
  const [numLikes, setNumLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [thumbedUp, setThumbedUp] = useState(false);
  const [ethInUSD, SetEthInUSD] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    converEthPrice();
    console.log('ether price api', process.env.ETHER_PRICE_API);
    getCollectibles().then(({ data }) => {
      setUserCollectibles(data)
    });

    getCollectible(id).then(async ({ data }) => {
      const newInfo: any = [];
      console.log("jjjjjjjjj", data)
      setCollectible(data);
      console.log("!!!!!!!!!!!!!!!!!! current time: ", new Date().getTime())
      console.log("bid finish time: ", data.endTime )
      console.log("staus",new Date().getTime() - data.endTime )
      setBidStartTime((data.startTime));
      setBidEndTime((data.endTime))
      if (data.ownerUserId) {
        const ownerInfo = await getUserInfo(data.ownerUserId);
        const avatar = ownerInfo.data.avatarUrl ? ownerInfo.data.avatarUrl : '/favicon.ico';

        newInfo.push({
          header: 'Owner',
          name: ownerInfo.data.name,
          avatarUrl: avatar,
        });

        getCollection(id).then(({ data }) => {
          console.log('collection:', data);
          setCollection({
            name: data.collectionName,
            avatarUrl: avatar,
          });
        });
      }

      if (data.creatorUserId) {
        const creatorInfo = await getUserInfo(data.creatorUserId);
        const avatar = creatorInfo.data.avatarUrl ? creatorInfo.data.avatarUrl : '/favicon.ico';

        newInfo.push({
          header: 'Creator',
          name: creatorInfo.data.name,
          avatarUrl: avatar,
        });
      }

      if (newInfo.length > 0) {
        setInfo(newInfo);
        setAuctionInfo(newInfo);
      }
    });

    getHistory(id).then(({ data }) => {
      // console.log("History:", data, id)
      data.forEach(async function (info: any) {
        const buyerInfo = await getUserInfo(info.buyerUserId);
        const sellerInfo = await getUserInfo(info.sellerUserId);
        console.log('!!!!!!!!!!!!!!!!sellerInfo', sellerInfo.data);
        info['buyerAvatarUrl'] = buyerInfo.data.avatarUrl;
        info['sellerAvatarUrl'] = sellerInfo.data.avatarUrl;
      });

      setHistory(data);
    });
    getAuctionHistory(id).then(({ data }) => {
      console.log('auction history', data);
      data.forEach(async function (info: any) {
        const auctionUserInfo = await getUserInfo(info.auctionUserId);
        // const sellerInfo = await getUserInfo(info.sellerUserId);
        info['buyerAvatarUrl'] = auctionUserInfo.data.avatarUrl;
        info['name'] = auctionUserInfo.data.name;
        // auctionInfo['sellerAvatarUrl'] = sellerInfo.data.avatarUrl;
      });
      setAuctionHistory(data);
    });
    getCollectibleLikes(id).then(({ data }) => {
      const liked = data.some((info: any) => {
        return info.userId == userId;
      });

      setLiked(liked);
      setNumLikes(data.length);
    });
    getCollectibleThumbs(id).then(({ data }) => {
      const thumbedup = data.some((info: any) => {
        return info.userId == userId;
      });

      setThumbedUp(thumbedup);
      setNumThumbs(data.length);
    });

    setLoading(false);
  }, [id]);

  const [highestBidder, setHighestBidder] = useState({
    addr: '',
    amount: '',
    startTime: '',
    endTime: '',
    status: '',
  });
  const [timeleft, setimeleft]: any = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    diff: 0,
  });
  useEffect(() => {
    //check highest bidding address and amount
    const init = async () => {
      const { data } = await getCollectible(id);
      try {
        const listing = await web3Contract.checkCollectibleStatus(data.ownerMetamaskId, data.tokenId);
        //alert(web3.utils.fromWei(listing[7].toString(), 'ether'))
        if (listing[6] != '0x0000000000000000000000000000000000000000') {
          setHighestBidder({
            addr: listing[6],
            amount: web3.utils.fromWei(listing[7].toString(), 'ether'),
            startTime: listing[2],
            endTime: listing[3],
            status: listing[0],
          });
        } else {
          //setHighestBidder()
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (highestBidder.status == '0x02') {
      if (parseInt(highestBidder.endTime) > 0) {
        setTimeout(() => {
          const timerObj = calculateTimeLeft();
          setimeleft(timerObj);
        }, 1000);
      }
    }
  });
  const calculateTimeLeft = () => {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const endTime = parseInt(highestBidder.endTime);
    //	1624161600
    const difference = moment(endTime).diff(moment(currentTime));
    console.log(difference);
    let timeLeft = {};
    timeLeft = {
      days: Math.floor(difference / (60 * 60 * 24)),
      hours: Math.floor((difference / (60 * 60)) % 24),
      minutes: Math.floor((difference / 60) % 60),
      seconds: Math.floor(difference % 60),
      diff: difference,
    };

    return timeLeft;
  };
  const converEthPrice = async () => {
    //console.log('start price function', process.env);
    // const {data} = await axios.get(`${process.env.ETHER_PRICE_API}`)
    const { data } = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHER_PRICE_API_KEY}`
    );
    console.log('price ether', data);
    const ethInUsd: any = data.result.ethusd;
    SetEthInUSD(ethInUsd);
  };
  const like = () => {
    likeCollectible(id).then(res => {
      setLiked(true);
      setNumLikes(numLikes + 1);
    });
  };

  const dislike = () => {
    dislikeCollectible(id).then(res => {
      setLiked(false);
      setNumLikes(numLikes - 1);
    });
  };

  const thumbsup = () => {
    thumbsupCollectible(id).then(res => {
      setThumbedUp(true);
      setNumThumbs(numThumbs + 1);
    });
  };

  const thumbsdown = () => {
    thumbsdownCollectible(id).then(res => {
      setThumbedUp(false);
      setNumThumbs(numThumbs - 1);
    });
  };
  const [showPopup, setShowPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [showOwnerFailedPopup, setShowOwnerFailedPopup] = useState(false);
  const [showBidPopup, setShowBidPopup] = useState(false);
  const [showFailedBid,setShowFailedBid] = useState(false);

  const handleTab = (_: React.ChangeEvent<unknown>, newValue: number) => selectTab(newValue);
  const isOwner = useIsCollectibleOwned(id, userCollectibles);
  const renderSwitch = (url: string) => {
    const extension = url.split('.').pop();

    if (extension) {
      switch (true) {
        case VALID_VIDEO_TYPES.includes(extension):
          return <video src={url} controls />;
        case VALID_AUDIO_TYPES.includes(extension):
          return <audio src={url} controls />;
        default:
          return (
            <>
              <img src={url} />
            </>
          );
      }
    }
  };

  if (isLoading) return <Loader />;
  if (!collectible) return <h1 style={{ textAlign: 'center' }}>Collectible does not exist</h1>;

  const thumbnailUrl = collectible.thumbnailUrl ? collectible.thumbnailUrl : '/collectible-image.jpeg';

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.fileWrapper}>{renderSwitch(thumbnailUrl)}</div>
        <div className={classes.socialActivityContainer}>
          <InfoIconWrapper item direction='row' alignItems='center'>
            {liked ? <GreySavedIcon onClick={() => dislike()} /> : <GreySaveIcon onClick={() => like()} />}
            <Typography variant='h6' className={classes.socialActivityAmount}>
              {numLikes}
            </Typography>
          </InfoIconWrapper>
          {/*<InfoIconWrapper item direction='row' alignItems='center'>
            <ViewsIcon />
            <Typography variant='h6' className={classes.socialActivityAmount}>3.5k</Typography>
          </InfoIconWrapper>*/}
          <InfoIconWrapper item direction='row' alignItems='center' lastIcon={true}>
            {thumbedUp ? <LikedIcon onClick={() => thumbsdown()} /> : <LikeIcon onClick={() => thumbsup()} />}
            <Typography variant='h6' className={classes.socialActivityAmount}>
              {numThumbs}
            </Typography>
          </InfoIconWrapper>
        </div>
      </div>
      <div className={classes.tokenDetailsContainer}>
        <div>
          <Typography variant='h6' className={classes.artLabel}>
            ART
          </Typography>
          <Typography variant='h1'>{collectible.name}</Typography>
          <div className={classes.tokenPriceContainer}>
            {collectible.price && (
              <>
                <Typography variant='h2'>{collectible.price}</Typography>
                <Typography variant='h6' className={classes.serviceCryptoFee}>
                  ${(collectible.price * ethInUSD).toFixed(3)}
                </Typography>
              </>
            )}
            <Typography variant='h6' className={classes.tokenDollarPrice}>
              {collectible.price && <Price.WeiToUsd value={collectible.price} />}
              {collectible.numberOfCopy + 1} of {collectible.totalCopies}
            </Typography>
          </div>
          <div className={classes.descriptionContainer}>
            <Typography variant='h4'>
              {collectible.description.length ? collectible.description : text['thereIsNoDscr']}
            </Typography>
          </div>
        </div>
        <Tabs value={tab} onChange={handleTab} TabIndicatorProps={{ style: { display: 'none' } }}>
          {tabs.map(({ label, value }) => (
            <Tab
              key={`${label}_${Math.random()}`}
              classes={{ root: classes.styledTab, selected: classes.selectedTab }}
              disableRipple
              selected={tab === value}
              value={value}
              label={text[label]}
              onClick={() => setTypeShow(label)}
            />
          ))}
        </Tabs>
        {console.log('TokenDetails: ', info)}
        {tab === TabVariants.INFO && <Info info={info} collection={collection} />}
        {/* {info.map((data: any) => (console.log("artist name: ", info.data.name)))} */}
        {console.log('artist name: ', collection)}
        {/*tab === TabVariants.OWNERS && <div />*/}
        {tab === TabVariants.HISTORY && <History list={history} name={collectible.name} collectibleId={id} />}

        {tab === TabVariants.BIDS && <History list={auctionHistory} name={collectible.name} collectibleId={id} />}

        {typeShow != 'History' && (
          <Grid>
            <div className={classes.highestBidInfoContainer}>
              <div className={classes.highestBidContainer}>
                {highestBidder.addr == '' ? (
                  'No bids avalaible'
                ) : (
                  <>
                    <Typography variant='h6'>{text['highestBidBy']}</Typography>
                    <Typography variant='h6' className={classes.walletAddress}>
                      {highestBidder.addr.slice(0, 6) + '...' + highestBidder.addr.slice(-4)}
                    </Typography>
                  </>
                )}
              </div>
              <div className={classes.highestBidContainer}>
                {/*<Typography variant='h2'>2,000 DAI</Typography>*/}
                <Typography variant='h3' className={classes.bidDollarAmount}>
                  {/* $2,000 */}
                  {highestBidder.amount != '0'
                    ? highestBidder.amount +
                      'ETH' +
                      ' ' +
                      '($' +
                      (Number(highestBidder.amount) * ethInUSD).toFixed(4) +
                      ')'
                    : null}
                </Typography>
              </div>
            </div>
            {console.log("for this collectable user ower status is:", isOwner)}
            {isOwner ? (
              <div className={classes.buttonsContainer}>
                <h1>You are the owner</h1>
              </div>
            ) : (

              <div className={classes.buttonsContainer}>
                {collectible.status == 'onSale' ? (
                  <Button onClick={() => setIsBuyModal(true)} label={text['buyNow']} className={classes.buyButton} />
                ) : (
                  new Date().getTime() - parseInt(bidEndTime) < 0 ? (
                    <div>
                      <div className={classes.serviceFeeInfoContainer}>

                        <Typography variant='h6'>Bid start Time: {toHumanDate(bidStartTime)}</Typography>

                      </div>
                      <div className={classes.serviceFeeInfoContainer}>
                        <Typography variant='h6'>Bid end Time: {toHumanDate(bidEndTime)}</Typography>

                      </div>
                      <Button
                        onClick={() => setIsBidModal(true)}
                        label={text['placeABid']}
                        className={classes.placeBidButton}
                      />
                      <Typography variant='h6'>Service fee 2.5%</Typography>
                    </div>
                    
                  ) : (
                    <Typography variant='h2'>Bid end at {toHumanDate(bidEndTime)}</Typography>
                  )
                )
                }

              </div>
            )}
              
                {/* <div className={classes.buttonsContainer}>
                  {collectible.status == 'onSale' ? (
                    <Button onClick={() => setIsBuyModal(true)} label={text['buyNow']} className={classes.buyButton} />
                  ) : (
                    <>
                     {timeleft.difference == 0 ? (
                        <Button
                         //onClick={() => setIsBidModal(true)}
                          label='Transfer'
                          className={classes.placeBidButton}
                        />
                      ) : (
                        <Button
                          onClick={() => setIsBidModal(true)}
                          label={text['placeABid']}
                          className={classes.placeBidButton}
                        />
                      )}
                    </>
                  )}
                </div>  */}
              

            
            <div className={classes.serviceFeeInfoContainer}>
              {/* <Typography variant='h6'>Service fee 2.5%</Typography> */}
              {/* <Typography
                  variant="h6"
                  className={classes.serviceCryptoFee}
              >
                  10.486 ETH
              </Typography> */}
              {/* <Typography
                  variant="h6"
                  className={classes.serviceDollarFee}
              >
                  $19,333.52
              </Typography> */}
            </div>


          </Grid>
        )}
      </div>
      {isBidModal && (
        <BidModal
        collectiblePrice={collectible.price}
          onSubmit={(bid: any) => {

            setBidValue(bid);
            setIsBidProgressModal(true);
            setIsBidModal(false);
          }}
          onClose={() => setIsBidModal(false)}
        />
      )}
      {isBuyModal && (
        <BuyModal
          setCopies={setNumCopies}
          numCopies={numCopies}
          onSubmit={() => {
            // console.log('385 line!!',bid)
            setIsBuyProgressModal(true);
            setIsBuyModal(false);
          }}
          onClose={() => setIsBuyModal(false)}
        />
      )}
      <Popup
        open={showPopup}
        textheader={'Purchase collectible directly;Congratulation!;Now you are the owner of ' + name}
        onClose={() => setShowPopup(false)}
      ></Popup>
      <Popup
        open={showFailedPopup}
        textheader={
          'Purchase collectible directly;;You failed to buy this collectible at $' +
          collectible.price +
          ', Please try again'
        }
        onClose={() => setShowFailedPopup(false)}
      ></Popup>
      <Popup
        open={showOwnerFailedPopup}
        textheader={'Bid Failed;;Owner cannot place bid'}
        onClose={() => setShowOwnerFailedPopup(false)}
      ></Popup>
      <Popup
        open={showBidPopup}
        textheader={'Bid status;;The Item was successfully bid'}
        onClose={() => setShowBidPopup(false)}
      ></Popup>
      <Popup
        open={showFailedBid}
        textheader={'You failed to bid'}
        onClose={() => setShowFailedBid(false)}
      ></Popup>
      {isFSModal && collectible && <FSModal src={collectible.thumbnailUrl} onClose={() => setFSModal(false)} />}
      {isBuyProgressModal && (
        <ProgressModal
          name={collectible.name}
          price={collectible.price}
          currentBidValue={bidValue}
          status='buy'
          onClose={() => {

            console.log("onclose #5")
            console.log('onclose #5');


            // setShowPopup(true);
            setIsBuyProgressModal(false);
          }}
          openSucessBox={() => setShowPopup(true)}
          openFailedBox={() => setShowFailedPopup(true)}
          openOwnerFailedBox={() => setShowOwnerFailedPopup(true)}
          openBidPopup={() => setShowBidPopup(true)}
          openFailedBid={() => setShowFailedBid(true)}
          
        />
      )}
      {isBidProgressModal && (
        <ProgressModal
          name={collectible.name}
          price={collectible.price}
          currentBidValue={bidValue}
          status='bid'
          onClose={() => {


            // setShowPopup(true);
            setIsBidProgressModal(false);
          }}
          openSucessBox={() => setShowPopup(true)}
          openFailedBox={() => setShowFailedPopup(true)}
          openOwnerFailedBox={() => setShowOwnerFailedPopup(true)}
          openBidPopup={() => setShowBidPopup(true)}
          openFailedBid={() => setShowFailedBid(true)}
          
        />
      )}
    </div>
  );
};

export default TokenDetails;
