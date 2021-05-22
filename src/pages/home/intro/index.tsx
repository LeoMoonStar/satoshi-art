import React from 'react';
// import { Link } from 'react-router-dom'

// import Button from 'components/button'
import nftImg from 'components/images/NFT.png';
import escalasImg from 'components/images/escalas.png';
import shadowImage from 'components/images/home/shadowInIntro.png';

import useStyles from './intro.style';

export default function PopularWorks(): JSX.Element {
  const classes = useStyles();

  return (
    <section>
      <div className={classes.container}>
        <div className={classes.explore}>
          <div className={classes.exploreBlock}>
            <div className={classes.introText}>
              <div className={classes.firstPartOfIntroText}>All The</div>
              <img src={nftImg} alt='Nft' />
              <div className={classes.secondPartOfIntroText}>in the world, now together. Here for you.</div>
            </div>
            {/*<Link to="/search" className={classes.exploreLink}>*/}
            {/*    <Button*/}
            {/*        label={t('exploreCollections')}*/}
            {/*        className={classes.exploreButton}*/}
            {/*    />*/}
            {/*</Link>*/}
          </div>
          <div className={classes.exploreBlockSecond}>
            <img src={escalasImg} />{' '}
          </div>
        </div>
        <img src={shadowImage} className={classes.exploreShadow} />
      </div>
    </section>
  );
}
