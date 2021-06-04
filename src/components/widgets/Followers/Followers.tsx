import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import text from '../../../constants/content';
import { getFollowers, getFollowings } from '../../../apis/users';
import { getUserCollectibles } from 'apis/collectibles'
import { useParams } from 'react-router-dom';
import FollowersList from './FollowersList';
import useStyles from './Followers.style';

export enum TabVariants {
  Followers = 0,
  Following = 1,
}

const tabs = [
  { label: 'Followers', value: TabVariants.Followers },
  { label: 'Following', value: TabVariants.Following },
];

const images = [
  { id: 1, src: 'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg' },
  { id: 2, src: 'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg' },
  { id: 3, src: 'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg' },
  { id: 4, src: 'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg' },
  { id: 5, src: 'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg' },
];

const followers = [
  { id: 1, name: 'Follower1', images },
  { id: 2, name: 'Follower2', images: [] },
];

const followings = [
  { id: 1, name: 'Following1', images },
  {
    id: 2,
    name: 'Following2',
    images: [],
  },
];

type FollowersProp = {
  active: TabVariants;
};

const Followers: React.FC<FollowersProp> = ({ active }): JSX.Element => {
  const classes = useStyles();
  const [tab, selectTab] = useState(active);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const { id } = useParams<{ id: string }>();

  const handleTab = (_: React.ChangeEvent<unknown>, newValue: number) => {
    selectTab(newValue);
  };

  useEffect(() => {
    if (id) {
      getFollowers(id)
        .then((res: any) => {
            const followers = res.data

            followers.forEach(async function (follow: any) {
                const collectibles = await getUserCollectibles(follow.id)
                const images: any = []

                collectibles.data.forEach(function ({ thumbnailUrl }: any, index: number) {
                    images.push({ id: index.toString(), src: thumbnailUrl })
                })

                follow['images'] = images
            })


            setUserFollowers(followers)
        })

      getFollowings(id)
        .then((res: any) => {
            const followings = res.data

            followings.forEach(async function (follow: any) {
                const collectibles = await getUserCollectibles(follow.id)
                const images: any = []

                collectibles.data.forEach(function ({ thumbnailUrl }: any, index: number) {
                    images.push({ id: index.toString(), src: thumbnailUrl })
                })

                follow['images'] = images
            })

            setUserFollowings(followings)
        })
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Tabs
          value={tab}
          onChange={handleTab}
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
        >
          {tabs.map(({ label, value }, index) => (
            <Tab
              key={index}
              disableRipple
              classes={{
                root: classes.styledTab,
                selected: classes.selectedTab,
              }}
              selected={tab === value}
              value={value}
              label={text[label]}
            />
          ))}
        </Tabs>
      </div>
      {
        {
          [TabVariants.Followers]: <FollowersList users={userFollowers}/>,
          [TabVariants.Following]: <FollowersList users={userFollowings}/>,
        }[tab]
      }
    </div>
  );
};

export default Followers;
