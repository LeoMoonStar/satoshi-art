import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import text from '../../../constants/content';
import { getUserInfo } from 'apis/users';
import { getToken } from 'apis/token';
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
  pageSize: number
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
  // const ownerinfo = await getUserInfo(collectibles.)
  if (isLoading) return <Loader />;
  return (
    <div>
      <div className={classes.grid}>
        {console.log("at the work collectibles: ", collectibles)}
        {collectibles.map(({ id, status, name, price, file, thumbnailUrl, creatorName }) => (

          <div className={classes.work} key={id}>
            {console.log("pagesize",pageSize)}
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
              </div>
              <div className={classes.authorInfo}>
                <span className={classes.creatorName}>@{creatorName}</span>
                <span> </span>
                <span>
                  {price && <Price.WeiToEth value={price} />}
                </span>

              </div>


              <div className={classes.workInfo}>

                {/* {console.log("Works.tsx, token info: ", await getToken(id))} */}
                <span className={classes.count}>1 of 1</span>
                {/* {console.log(name,status)} */}

                {status === "onSale" && (
                  <Button className={classes.bidButton}>
                    <div onClick={() => location.replace(`/product/${id}`)}>
                      <TextGradient colors='#FF0099, #6A2FE7'>{text['buyNow']}</TextGradient>
                    </div>
                  </Button>
                )}

                {isCollectibleOwned(id, collectibles) || isArtistPage ? (
                  <span style={{ marginLeft: '5px' }}>You are the Owner</span>
                ) : (
                  status === "onHold" && (<Button className={classes.bidButton}>
                    <div>
                      <TextGradient colors='#FF0099, #6A2FE7'>{text['placeABid']}</TextGradient>
                    </div>
                  </Button>)

                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemsCount={itemsCount}
        onPageChange={onPageChange}
      />

    </div>
  );
}
