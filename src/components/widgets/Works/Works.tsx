import React from 'react';
import { IconButton } from '@material-ui/core';
import text from '../../../constants/content';

import { useCurrentNetwork } from 'hooks/useCurrentNetwork';
import Button from '../../button';
import { SaveIcon, ViewsIcon } from '../../icons';
import Avatar from '../../avatar';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import TextGradient from '../TextGradient';
import artistAvatar from 'components/images/artist/avatar.jpg';
import Pagination from 'components/widgets/Pagination';
import TokenPreview from '../TokenPreview';
import { Collectible } from '../../../apis/collectibles';
import useStyles from './Works.style';
import { shortAddress } from 'utils/helpers';
import Price from '../Price';
import { isCollectibleOwned } from 'utils/common';

type WorksListProps = {
  borderWidth?: number;
  variant?: 'none' | 'rounded';
  isLoading?: boolean;
  collectibles?: Collectible[];
  isArtistPage?: boolean;
  currentPage: number,
  pageSize:number
itemsCount: number
  onPageChange: any
};

export default function WorksList({
  borderWidth = 1,
  variant = 'none',
  isLoading,
  collectibles = [],
  isArtistPage = false,
  currentPage,
          pageSize,
          itemsCount,
          onPageChange,
}: WorksListProps): JSX.Element {
  const { explorer } = useCurrentNetwork();
  const classes = useStyles();
  const viewThumbnail = (file: any, thumbnailUrl: any) => {
    if (file && file.thumbnailUrl) {
      return file.thumbnailUrl;
    } else if (thumbnailUrl) {
      return thumbnailUrl;
    } else {
      return '/collectible-image.jpeg';
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className={classes.grid}>
        {collectibles.map(({ id, status, name, price, creatorId, file, thumbnailUrl }) => (
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
                {/*<div className={classes.actionButtons}>
                  <IconButton className={classes.actionButton}>
                    <SaveIcon onClick={() => followingCollection(id)} />
                  </IconButton>
                </div>*/}
              </div>
              <div className={classes.authorInfo}>
                {/* ignore
                <a target='_blank' rel='noreferrer' href={`${explorer}/address/${creatorId}`}>
                  {shortAddress(creatorId)}
                </a>*/}
                {price && <Price.WeiToEth value={price} />}
              </div>
              <div className={classes.workInfo}>
                <span className={classes.count}>1 of 1</span>

                {status == "onSale" && (
                  <Button className={classes.bidButton}>
                    <div onClick={() => location.replace(`/product/${id}`)}>
                      <TextGradient colors='#FF0099, #6A2FE7'>{text['buyNow']}</TextGradient>
                    </div>
                  </Button>
                )}

                {isCollectibleOwned(id, collectibles) || isArtistPage ? (
                  <span style={{ marginLeft: '5px' }}>You are the Owner</span>
                ) : (
                  <Button className={classes.bidButton}>
                    <div>
                      <TextGradient colors='#FF0099, #6A2FE7'>{text['placeABid']}</TextGradient>
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        itemsCount!=0?
        (
<Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          itemsCount={itemsCount}
          onPageChange={onPageChange}
        />
        ):''
      }
      
    </div>
  );
}
