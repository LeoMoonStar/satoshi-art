import React from 'react';
import { Link } from 'react-router-dom';

import colorsDissolvingImage from 'components/nts/images/home/colorsDissolving.png';
import bradPitImage from 'components/images/home/bradPit.png';
import DropOfTheDaySlider from 'components/widgets/DropOfTheDaySlider';

import useStyles from './DropOfTheDay.styles';

export default function DropOfTheDay(): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div className={classes.innerContainer}>
        <h2 className={classes.mainTitle}>{'Drop Of the Day'}</h2>
        <div className={classes.card}>
          <Link to='/drop-of-the-day'>
            <div className={classes.leftCol}>
              <h3>Brad Pit</h3>
              <img src={bradPitImage} />
            </div>
          </Link>
          <div className={classes.rightCol}>
            <DropOfTheDaySlider />
          </div>
        </div>
      </div>
      <img className={classes.colorsDissolving} src={colorsDissolvingImage} />
    </section>
  );
}
