import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';

import text from '../../../../constants/content';

import bradPitPaintImage from 'components/images/home/bradPitPaint.png';
import Avatar from 'components/avatar';
import Button from 'components/button';
import { SaveIcon, ViewsIcon } from 'components/icons';
import useStyles from '../DropOfTheDaySlider.style';
import { useIsCollectibleOwned } from 'utils/common';
import { getCollectibles } from 'apis/collectibles'

type DropOfTheDaySliderItemProps = {
  id: string
  name: string,
  imagePreview: string,
  price: string
};

export default function DropOfTheDaySliderItem({ id, name, imagePreview, price }: DropOfTheDaySliderItemProps): JSX.Element {
  const classes = useStyles();
  const [userCollectibles, setUserCollectibles] = useState([])
  const isTokenOwned = useIsCollectibleOwned(id, userCollectibles)

  useEffect(() => {
      getCollectibles()
          .then(({ data }) => {
              setUserCollectibles(data)
          })
  }, [])

  return (
    <div className={classes.slide}>
      <img src={imagePreview} alt="" className={classes.slideImage}/>

      <div className={classes.info}>
        <Avatar alt='Fresh meat' status='premium' size={60} image={imagePreview} />
        <div className={classes.header}>
          <h3>{name}</h3>

          <div className={classes.actionButtons}>
            <IconButton className={classes.actionButton}><SaveIcon /></IconButton>
            <IconButton className={classes.actionButton}><ViewsIcon /></IconButton>
          </div>
        </div>
        <div className={classes.cardContent}>
          <div className={classes.authorInfo}>
            <a href='/artists/1'>@Fimbim</a> 124.56x3 ETH
          </div>
          <div className={classes.workInfo}>
            {price} ETH
            <span className={classes.count}>1 of 1</span>
            {isTokenOwned ? null : <Button className={classes.bidButton}>{text['placeABid']}</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
