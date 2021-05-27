import React from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import Avatar from 'components/avatar';
import Button from 'components/button';
import { LikeIcon, ViewsIcon } from 'components/icons';

import useStyles from './FollowingAndFollowers.style';

import preview from 'components/images/artist/work.jpg';
const items: number[] = Array.from({ length: 5 }, (index: number): number => index);

const Item = () => {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <Avatar image={preview} size={84} />
      <div className={classes.itemInfo}>
        <div className={classes.topRow}>
          <Link to={`/artists/1`} style={{ textDecoration: 'none' }}>
            <b className={classes.userName}>Flimbim</b>
          </Link>
          <Button variantCustom='outlinedLink' className={classes.followingButton}>
            {text['followingBtn']}
          </Button>
        </div>
        <div className={classes.location}>Berlin, Germany</div>
        <div className={classes.balance}>124.563 ETH</div>
        <div className={classes.bottomRow}>
          <div className={classes.bottomCol}>
            <LikeIcon /> 21,0k
          </div>
          <div className={classes.bottomCol}>
            <ViewsIcon /> 216,8k
          </div>
        </div>
      </div>
      <div className={classes.previewWorks}>
        <div className={classes.previewWork}>
          <img src={preview} alt='' />
        </div>
        <div className={classes.previewWork}>
          <img src={preview} alt='' />
        </div>
      </div>
    </div>
  );
};

export default function Collections(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.col}>
        <h2 className={classes.title}>{text['following']}</h2>
        <div className={classes.items}>
          {items.map(item => (
            <Item key={item} />
          ))}
          <Button variantCustom='action' className={classes.viewAll}>
            {text['viewAll']}
          </Button>
        </div>
      </div>
      <div className={classes.col}>
        <h2 className={classes.title}>{text['followers']}</h2>
        <div className={classes.items}>
          {items.map(item => (
            <Item key={item} />
          ))}
          <Button variantCustom='action' className={classes.viewAll}>
            {text['viewAll']}
          </Button>
        </div>
      </div>
    </div>
  );
}
