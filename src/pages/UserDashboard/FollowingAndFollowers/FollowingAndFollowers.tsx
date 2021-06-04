import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import Avatar from 'components/avatar';
import Button from 'components/button';
import { LikeIcon, ViewsIcon } from 'components/icons';
import { readCookie } from 'apis/cookie'
import { getUserInfo, getFollowers, getFollowings } from 'apis/users'
import { getUserCollectibles } from 'apis/collectibles'

import useStyles from './FollowingAndFollowers.style';

import preview from 'components/images/artist/work.jpg';

const Item = ({ follow }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <Avatar image={follow.avatarUrl} size={84} />
      <div className={classes.itemInfo}>
        <div className={classes.topRow}>
          <b className={classes.userName}>{follow.name}</b>
          {/*<Button variantCustom='outlinedLink' className={classes.followingButton}>
            {text['followingBtn']}
          </Button>*/}
        </div>
        {/*<div className={classes.location}>Berlin, Germany</div>
        <div className={classes.balance}>124.563 ETH</div>
        <div className={classes.bottomRow}>
          <div className={classes.bottomCol}>
            <LikeIcon /> 21,0k
          </div>
          <div className={classes.bottomCol}>
            <ViewsIcon /> 216,8k
          </div>
        </div>*/}
      </div>
      <div className={classes.previewWorks}>
        <div className={classes.previewWork}>
          <img src={follow.thumbnailOne} alt='' />
        </div>
        <div className={classes.previewWork}>
          <img src={follow.thumbnailTwo} alt='' />
        </div>
      </div>
    </div>
  );
};

export default function Collections(): JSX.Element {
  const classes = useStyles();
  const id = readCookie("id")
  const [userFollowers, setUserFollowers] = useState([])
  const [userFollowings, setUserFollowings] = useState([])

  useEffect(() => {
      if (id) {
          getFollowings(id)
          .then((res: any) => {
              const followings = res.data

              followings.forEach(async function (follow: any) {
                  const collectibles = await getUserCollectibles(follow.id)

                  follow['id'] = follow.id
                  follow['thumbnailOne'] = collectibles.data[0].thumbnailUrl
                  follow['thumbnailTwo'] = collectibles.data[1].thumbnailUrl
              })

              setUserFollowings(followings)
          })

          getFollowers(id)
          .then((res: any) => {
              const followers = res.data

              followers.forEach(async function (follow: any) {
                  const collectibles = await getUserCollectibles(follow.id)

                  follow['id'] = follow.id
                  follow['thumbnailOne'] = collectibles.data[0].thumbnailUrl
                  follow['thumbnailTwo'] = collectibles.data[1].thumbnailUrl
              })

              setUserFollowers(followers)
          })
      }
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.col}>
        <h2 className={classes.title}>{text['following']}</h2>
        <div className={classes.items}>
          {userFollowings.map((following, index) => <Item key={index} follow={following} />)}
          {/*<Button variantCustom='action' className={classes.viewAll}>
            {text['viewAll']}
          </Button>*/}
        </div>
      </div>
      <div className={classes.col}>
        <h2 className={classes.title}>{text['followers']}</h2>
        <div className={classes.items}>
          {userFollowers.map((follower, index) => <Item key={index} follow={follower} />)}
          {/*<Button variantCustom='action' className={classes.viewAll}>
            {text['viewAll']}
          </Button>*/}
        </div>
      </div>
    </div>
  );
}
