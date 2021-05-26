import React from 'react';
import { IconButton } from '@material-ui/core';

import text from '../../../../../public/content';

import bradPitPaintImage from 'components/images/home/bradPitPaint.png';
import Avatar from 'components/avatar';
import Button from 'components/button';
import { SaveIcon, ViewsIcon } from 'components/icons';
import useStyles from '../DropOfTheDaySlider.style';
import useWalletTokens from 'hooks/useWalletTokens';
import { useIsCollectibleOwned } from 'utils/common';

type DropOfTheDaySliderItemProps = {
  id: string;
};

export default function DropOfTheDaySliderItem({ id }: DropOfTheDaySliderItemProps): JSX.Element {
  const classes = useStyles();
  const userTokens = useWalletTokens();
  const isTokenOwned = useIsCollectibleOwned(id, userTokens);

  return (
    <div className={classes.slide}>
      <img src={bradPitPaintImage} alt='' className={classes.slideImage} />
      <div className={classes.info}>
        <Avatar alt='Fresh meat' status='premium' size={60} image={bradPitPaintImage} />
        <div className={classes.header}>
          <h3>Fresh Meat #F</h3>
          <div className={classes.actionButtons}>
            <IconButton className={classes.actionButton}>
              <SaveIcon />
            </IconButton>
            <IconButton className={classes.actionButton}>
              <ViewsIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.cardContent}>
          <div className={classes.authorInfo}>
            <a href='/artists/1'>@Fimbim</a> 124.56x3 ETH
          </div>
          <div className={classes.workInfo}>
            0.25 ETH
            <span className={classes.count}>1 of 1</span>
            {isTokenOwned ? null : <Button className={classes.bidButton}>{text['placeABid']}</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
