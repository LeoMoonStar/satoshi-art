import React, { useState, useEffect } from 'react';
import { styled, Grid, Typography, IconButton, Tab, Tabs, Theme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import text from '../../../constants/content';
import { ExpandIcon, GreySaveIcon, ViewsIcon, LikeIcon, SaveIcon, DotsIcon } from 'components/icons';
import Button from 'components/button';
import Loader from 'components/widgets/Loader';
import { VALID_VIDEO_TYPES, VALID_AUDIO_TYPES } from 'constants/supportedFileTypes';
import { getCollectible, CollectibleInfo } from 'apis/collectibles';
import { TokenInfo } from './TokenInfo';
import BidModal from './BidModal';
import BuyModal from './BuyModal';
import FSModal from './FSModal';
import useStyles from './TokenDetails.style';
import ProgressModal from './ProgressModal';
import Price from 'components/widgets/Price';
import { TokenType } from 'state/transactions/actions';
import { SERVICE_FEE } from 'constants/common';
import useWalletTokens from 'hooks/useWalletTokens';
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
  { label: 'Info', value: TabVariants.INFO },
  { label: 'Owners', value: TabVariants.OWNERS },
  { label: 'History', value: TabVariants.HISTORY },
  { label: 'Bids', value: TabVariants.BIDS },
];

const TokenDetails = (): JSX.Element => {
  const [tab, selectTab] = useState(TabVariants.INFO);
  const [isBidModal, setBidModal] = useState<boolean>(false);
  const [isBuyModal, setBuyModal] = useState<boolean>(false);
  const [isFSModal, setFSModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [collectible, setCollectible] = useState<CollectibleInfo>();
  const [isProgressModal, setIsProgressModal] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();

  const userTokens = useWalletTokens();

  useEffect(() => {
    window.scrollTo(0, 0);

    getCollectible(id).then(res => {
      setCollectible(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleTab = (_: React.ChangeEvent<unknown>, newValue: number) => selectTab(newValue);
  const isTokenOwner = useIsCollectibleOwned(id, userTokens);

  const renderIcons = () => (
    <div className={classes.iconsContainer}>
      <IconWrapper item alignItems='center' justify='center'>
        <IconButton>
          <SaveIcon />
        </IconButton>
      </IconWrapper>
      <IconWrapper onClick={() => setFSModal(true)} item alignItems='center' justify='center'>
        <IconButton>
          <ExpandIcon />
        </IconButton>
      </IconWrapper>
      <IconWrapper item alignItems='center' justify='center' dots={true}>
        <IconButton>
          <DotsIcon />
        </IconButton>
      </IconWrapper>
    </div>
  );

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
              {renderIcons()}
            </>
          );
      }
    }
  };

  if (isLoading) return <Loader />;
  if (!collectible) return <h1>Oops something went wrong</h1>;

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.fileWrapper}>
          {collectible.thumbnailUrl ? renderSwitch(collectible.thumbnailUrl) : renderSwitch('./collectible-image.jpeg')}
        </div>
        <div className={classes.socialActivityContainer}>
          <InfoIconWrapper item direction='row' alignItems='center'>
            <GreySaveIcon />
            <Typography variant='h6' className={classes.socialActivityAmount}>
              2k
            </Typography>
          </InfoIconWrapper>
          <InfoIconWrapper item direction='row' alignItems='center'>
            <ViewsIcon />
            <Typography variant='h6' className={classes.socialActivityAmount}>
              3.5k
            </Typography>
          </InfoIconWrapper>
          <InfoIconWrapper item direction='row' alignItems='center' lastIcon={true}>
            <LikeIcon />
            <Typography variant='h6' className={classes.socialActivityAmount}>
              220
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
              <Typography variant='h2'>
                <Price.WeiToEth value={collectible.price} />
              </Typography>
            )}
            <Typography variant='h6' className={classes.tokenDollarPrice}>
              {collectible.price && <Price.WeiToUsd value={collectible.price} />}
              {/*collectible.copiesCount} of {collectible.copiesCount*/}
            </Typography>
          </div>
          <div className={classes.descriptionContainer}>
            <Typography variant='h4'>{collectible.description || text['thereIsNoDscr']}</Typography>
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
            />
          ))}
        </Tabs>
        {tab === TabVariants.INFO && <TokenInfo collectible={collectible} />}
        {tab === TabVariants.OWNERS && <div />}
        {tab === TabVariants.HISTORY && <div />}
        {tab === TabVariants.BIDS && <div />}
        <Grid>
          <div className={classes.highestBidInfoContainer}>
            <div className={classes.highestBidContainer}>
              <Typography variant='h6'>{text['highestBidBy']}</Typography>
              <Typography variant='h6' className={classes.walletAddress}>
                0xcabb22cb1...ba05
              </Typography>
            </div>
            <div className={classes.highestBidContainer}>
              <Typography variant='h2'>2,000 DAI</Typography>
              <Typography variant='h3' className={classes.bidDollarAmount}>
                $2,000
              </Typography>
            </div>
          </div>

          {collectible.price && (
            <div className={classes.serviceFeeInfoContainer}>
              <Typography variant='h6'>{text['serviceFeeProgress'] + SERVICE_FEE}</Typography>
              <Typography variant='h6' className={classes.serviceCryptoFee}>
                <Price.WeiToEth withFee value={collectible.price} />
              </Typography>
              <Typography variant='h6' className={classes.serviceDollarFee}>
                <Price.WeiToUsd withFee value={collectible.price} />
              </Typography>
            </div>
          )}

          {isTokenOwner ? (
            <div className={classes.buttonsContainer}>
              <h1>You are the owner</h1>
            </div>
          ) : (
            <div className={classes.buttonsContainer}>
              <Button onClick={() => setBuyModal(true)} label={text['buyNow']} className={classes.buyButton} />
              <Button onClick={() => setBidModal(true)} label={text['placeABid']} className={classes.placeBidButton} />
            </div>
          )}
          <div className={classes.serviceFeeInfoContainer}>
            <Typography variant='h6'>{text['serviceFeeProgress'] + '2.5'}</Typography>
            <Typography variant='h6' className={classes.serviceCryptoFee}>
              10.486 ETH
            </Typography>
            <Typography variant='h6' className={classes.serviceDollarFee}>
              $19,333.52
            </Typography>
          </div>
        </Grid>
      </div>
      {isBidModal && (
        <BidModal
          onSubmit={() => {
            setIsProgressModal(true);
            setBidModal(false);
          }}
          onClose={() => setBidModal(false)}
        />
      )}
      {isBuyModal && (
        <BuyModal
          onSubmit={() => {
            setIsProgressModal(true);
            setBuyModal(false);
          }}
          onClose={() => setBuyModal(false)}
        />
      )}
      {isFSModal && collectible && <FSModal src={collectible.thumbnailUrl} onClose={() => setFSModal(false)} />}
      {isProgressModal && <ProgressModal onClose={() => setIsProgressModal(false)} />}
    </div>
  );
};

export default TokenDetails;
