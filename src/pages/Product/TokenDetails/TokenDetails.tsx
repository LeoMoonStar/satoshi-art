import React, { useState, useEffect } from 'react';
import { styled, Grid, Typography, IconButton, Tab, Tabs, Theme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import text from '../../../constants/content';
import { ExpandIcon, GreySaveIcon, ViewsIcon, LikeIcon, SaveIcon, DotsIcon } from 'components/icons';
import Button from 'components/button';
import Loader from 'components/widgets/Loader';
import { VALID_VIDEO_TYPES, VALID_AUDIO_TYPES } from 'constants/supportedFileTypes';
import { 
  getCollectible, getCollectibles, CollectibleInfo, getHistory, 
  likeCollectible, dislikeCollectible, thumbsupCollectible, thumbsdownCollectible, 
  getCollectibleThumbs, getCollectibleLikes
} from 'apis/collectibles';
import { getUserInfo } from 'apis/users'
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
    {
        label: 'Owners',
        value: TabVariants.OWNERS,
    },
    {
        label: 'History',
        value: TabVariants.HISTORY,
    },
    {
        label: 'Bids',
        value: TabVariants.BIDS,
    },
]
const TokenDetails = (): JSX.Element => {
  const [tab, selectTab] = useState(TabVariants.INFO);
  const [isBidModal, setIsBidModal] = useState<boolean>(false);
  const [isBuyModal, setIsBuyModal] = useState<boolean>(false);
  const [isFSModal, setFSModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [collectible, setCollectible] = useState<CollectibleInfo>();
  const [isProgressModal, setIsProgressModal] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const [userCollectibles, setUserCollectibles] = useState([])
  const [userAction, setUserAction] = useState<string>('')
  const [history, setHistory] = useState([])
  const [numCopies, setNumCopies] = useState('1')
  const [typeShow, setTypeShow] = useState('Info')
  const [numThumbs, setNumThumbs] = useState(false)
  const [numLikes, setNumLikes] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);

    getCollectibles().then(({ data }) => setUserCollectibles(data))
    getCollectible(id).then(({ data }) => setCollectible(data));
    getHistory(id).then(({ data }) => {
      data.forEach(async function (info: any) {
          const buyerInfo = await getUserInfo(info.buyerUserId)
          const sellerInfo = await getUserInfo(info.sellerUserId)

          info['buyerAvatarUrl'] = buyerInfo.data.avatarUrl
          info['sellerAvatarUrl'] = sellerInfo.data.avatarUrl

      })

      setHistory(data)
    })

    setLoading(false)
  }, [id]);

  const like = () => {
    likeCollectible(id)
      .then((res) => console.log("success"))
  }

  const dislike = () => {
    dislikeCollectible(id)
      .then((res) => console.log("success"))
  }

  const thumbsup = () => {
    thumbsupCollectible(id)
      .then((res) => console.log("success"))
  }

  const thumbsdown = () => {
    thumbsdownCollectible(id)
      .then((res) => console.log("success"))
  }

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
              <div className={classes.iconsContainer}>
                <IconWrapper item alignItems='center' justify='center'>
                  <IconButton onClick={() => like()}><SaveIcon /></IconButton>
                </IconWrapper>
                <LikeIcon onClick={() => thumbsup()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'white', borderRadius: 23, borderStyle: 'solid', borderWidth: 2, marginRight: 10, padding: 10, width: 22, height: 20 }}/>
                <IconWrapper onClick={() => setFSModal(true)} item alignItems='center' justify='center'>
                  <IconButton><ExpandIcon /></IconButton>
                </IconWrapper>
                <IconWrapper item alignItems='center' justify='center' dots={true}>
                  <IconButton><DotsIcon /></IconButton>
                </IconWrapper>
              </div>
            </>
          );
      }
    }
  };

  if (isLoading) return <Loader />;
  if (!collectible) return <h1>Oops something went wrong</h1>;

  const thumbnailUrl = collectible.thumbnailUrl ? collectible.thumbnailUrl : '/collectible-image.jpeg'

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.fileWrapper}>
          {renderSwitch(thumbnailUrl)}
        </div>
        <div className={classes.socialActivityContainer}>
          <InfoIconWrapper item direction='row' alignItems='center'>
            <GreySaveIcon />
            <Typography variant='h6' className={classes.socialActivityAmount}>2k</Typography>
          </InfoIconWrapper>
          <InfoIconWrapper item direction='row' alignItems='center'>
            <ViewsIcon />
            <Typography variant='h6' className={classes.socialActivityAmount}>3.5k</Typography>
          </InfoIconWrapper>
          <InfoIconWrapper item direction='row' alignItems='center' lastIcon={true}>
            <LikeIcon />
            <Typography variant='h6' className={classes.socialActivityAmount}>220</Typography>
          </InfoIconWrapper>
        </div>
      </div>
      <div className={classes.tokenDetailsContainer}>
        <div>
          <Typography variant='h6' className={classes.artLabel}>ART</Typography>
          <Typography variant='h1'>{collectible.name}</Typography>
          <div className={classes.tokenPriceContainer}>
            {collectible.price && (
              <Typography variant='h2'><Price.WeiToEth value={collectible.price} /></Typography>
            )}
            <Typography variant='h6' className={classes.tokenDollarPrice}>
              {collectible.price && <Price.WeiToUsd value={collectible.price} />}
              1 of 10
            </Typography>
          </div>
          <div className={classes.descriptionContainer}>
            <Typography variant='h4'>{collectible.description.length ? collectible.description : text['thereIsNoDscr']}</Typography>
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
        {tab === TabVariants.INFO && <Info collectible={collectible} />}
        {tab === TabVariants.OWNERS && <div />}
        {tab === TabVariants.HISTORY && <History list={history} name={collectible.name}/>}
        {tab === TabVariants.BIDS && <div />}
        <Grid>
          <div className={classes.highestBidInfoContainer}>
            <div className={classes.highestBidContainer}>
              <Typography variant='h6'>{text['highestBidBy']}</Typography>
              <Typography variant='h6' className={classes.walletAddress}>0xcabb22cb1...ba05</Typography>
            </div>
            <div className={classes.highestBidContainer}>
              <Typography variant='h2'>2,000 DAI</Typography>
              <Typography variant='h3' className={classes.bidDollarAmount}>$2,000</Typography>
            </div>
          </div>

          {collectible.price && (
            <div className={classes.serviceFeeInfoContainer}>
              <Typography variant='h6'>Service fee {SERVICE_FEE}%</Typography>
              <Typography variant='h6' className={classes.serviceCryptoFee}>
                <Price.WeiToEth withFee value={collectible.price} />
              </Typography>
              <Typography variant='h6' className={classes.serviceDollarFee}>
                <Price.WeiToUsd withFee value={collectible.price} />
              </Typography>
            </div>
          )}

          {isOwner ? (
            <div className={classes.buttonsContainer}><h1>You are the owner</h1></div>
          ) : (
            <div className={classes.buttonsContainer}>
              {typeShow != 'Bids' && <Button onClick={() => setIsBuyModal(true)} label={text['buyNow']} className={classes.buyButton} />}
              {typeShow == 'Bids' && <Button onClick={() => setIsBidModal(true)} label={text['placeABid']} className={classes.placeBidButton} />}
            </div>
          )}
          <div className={classes.serviceFeeInfoContainer}>
            <Typography
                variant='h6'
            >
                Service fee 2.5%
            </Typography>
            <Typography
                variant="h6"
                className={classes.serviceCryptoFee}
            >
                10.486 ETH
            </Typography>
            <Typography
                variant="h6"
                className={classes.serviceDollarFee}
            >
                $19,333.52
            </Typography>
          </div>
        </Grid>
      </div>
      {isBidModal && (
        <BidModal
          onSubmit={() => {
            setIsProgressModal(true)
            setIsBidModal(false)
          }}
          onClose={() => setIsBidModal(false)}
        />
      )}
      {isBuyModal && (
        <BuyModal
          setCopies={setNumCopies} 
          numCopies={numCopies}
          onSubmit={() => {
            setIsProgressModal(true);
            setIsBuyModal(false);
          }}
          onClose={() => setIsBuyModal(false)}
        />
      )}
      {isFSModal && collectible && <FSModal src={collectible.thumbnailUrl} onClose={() => setFSModal(false)} />}
      {isProgressModal && <ProgressModal price={collectible.price} onClose={() => setIsProgressModal(false)} />}
    </div>
  );
};

export default TokenDetails;
