import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import useStyles from './DropOfTheDayArtist.style';
import DropOfTheDaySlider from '..//DropOfTheDaySlider';

type HistoryItemProps = {
  color: string;
  id: number;
  name: string;
  artistImage: string;
  imagePreview?: string;
  onSeeAll?: () => void;
};

export default function DropOfTheDayArtist({ color, id, name, artistImage, onSeeAll }: HistoryItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.card} style={{ backgroundColor: color }}>
        <Link to={`/drop-of-the-day`} style={{ textDecoration: 'none' }}>
          <div className={classes.leftCol}>
            <h3>{name}</h3>
            <img src={artistImage} />
          </div>
        </Link>
        <div className={cx(classes.rightCol, { [classes.whiteSliderDots]: color === '#C4C4C4' })}>
          <DropOfTheDaySlider onSeeAll={onSeeAll} />
        </div>
      </div>
    </div>
  );
}
