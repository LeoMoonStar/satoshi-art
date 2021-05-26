import React from 'react';
import { IconButton } from '@material-ui/core';
import text from '../../../../public/content';

import { useCurrentNetwork } from 'hooks/useCurrentNetwork';
import Button from '../../button';
import { SaveIcon, ViewsIcon } from '../../icons';
import Avatar from '../../avatar';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import TextGradient from '../TextGradient';
import artistAvatar from 'components/images/artist/avatar.jpg';

import TokenPreview from '../TokenPreview';
import { Collectible } from '../../../apis/collectibles';
import useStyles from './Works.style';
import { shortAddress } from 'utils/helpers';
import Price from '../Price';
import useWalletTokens from 'hooks/useWalletTokens';
import { isCollectibleOwned } from 'utils/common';

type WorksListProps = {
  borderWidth?: number;
  variant?: 'none' | 'rounded';
  isLoading?: boolean;
  collectibles?: Collectible[];
  isArtistPage?: boolean;
};

export default function WorksList({
  borderWidth = 1,
  variant = 'none',
  isLoading,
  collectibles = [],
  isArtistPage = false,
}: WorksListProps): JSX.Element {
  const { explorer } = useCurrentNetwork();

  const classes = useStyles();

  const userCollectibles = useWalletTokens();
  const viewThumbnail = (file: any, thumbnailUrl: any) => {
    if (file && file.thumbnailUrl) {
      return file.thumbnailUrl;
    } else if (thumbnailUrl) {
      return thumbnailUrl;
    } else {
      return '/collectible-image.jpeg';
    }
  };

  const followingCollection = (collectionid: string) => {
    console.log('following collection');
  };

  const followerCollection = (collectionid: string) => {
    console.log('follower collection');
  };

  const placeABid = (collectionid: string) => {
    console.log('place a bid');
  };

  const buyNow = (collectionid: string) => {
    console.log('buy now');
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className={classes.grid}>
        {collectibles.map(({ id, name, price, status, creatorId, file, thumbnailUrl }) => (
          <div className={classes.work} key={id}>
            <div className={classes.imagePresentation}>
              <Link to={`/product/${id}`}>
                <TokenPreview
                  src={viewThumbnail(file, thumbnailUrl)}
                  style={{ borderRadius: variant === 'rounded' ? 30 : 0 }}
                />
              </Link>
            </div>

            <div className={classes.info} style={{ borderWidth }}>
              <div className={classes.authorAvatar}>
                <Avatar size={60} image={artistAvatar} alt='User name' status='premium' />
              </div>
              <div className={classes.infoHead}>
                <h2 className={classes.name}>{name}</h2>
                <div className={classes.actionButtons}>
                  <IconButton className={classes.actionButton}>
                    <SaveIcon onClick={() => followingCollection(id)} />
                  </IconButton>
                  {/*<IconButton className={classes.actionButton}><ViewsIcon onClick={() => followerCollection(id)}/></IconButton>*/}
                </div>
              </div>
              <div className={classes.authorInfo}>
                <a target='_blank' rel='noreferrer' href={`${explorer}/address/${creatorId}`}>
                  {shortAddress(creatorId)}
                </a>
                {price && <Price.WeiToEth value={price} />}
              </div>
              <div className={classes.workInfo}>
                <span className={classes.count}>1 of 1</span>

                <Button className={classes.bidButton}>
                  <div onClick={() => buyNow(id)}>
                    <TextGradient colors='#FF0099, #6A2FE7'>{text['buyNow']}</TextGradient>
                  </div>
                </Button>

                {isCollectibleOwned(id, userCollectibles) || isArtistPage ? (
                  <span style={{ marginLeft: '5px' }}>You are the Owner</span>
                ) : (
                  <Button className={classes.bidButton}>
                    <div onClick={() => placeABid(id)}>
                      <TextGradient colors='#FF0099, #6A2FE7'>{text['placeABid']}</TextGradient>
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
