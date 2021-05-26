import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { IconButton } from '@material-ui/core';
import text from '../../../../public/content';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { followUser, unfollowUser, getUserInfo, getFollowers, getFollowings } from 'apis/users';

import Button from 'components/button';
import Avatar from 'components/avatar';
import { LikeIcon, SaveIcon, ViewsIcon, ThreeDotsIcon } from 'components/icons';
import artistAvatar from 'components/images/artist/avatar.jpg';
import nftImage from 'components/images/nft.svg';

import useStyles from './PageDetails.style';

export default function PageDetails(): JSX.Element {
  const classes = useStyles();
  const [isOpenActions, setIsOpenActions] = useState<boolean>();

  const { account } = useWeb3React<Web3Provider>();
  const { id } = useParams<{ id: string }>();
  const [isArtist, setIsArtist] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('Good collection. Stay tune'); // fetch from server
  const [url, setUrl] = useState('twitter.com/username'); // fetch from server
  const [avatar, setAvatar] = useState('');
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowings, setNumFollowings] = useState(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleToggleActions = () => {
    setIsOpenActions(!isOpenActions);
  };

  const followArtist = (otherMetamask: string) => {
    followUser(otherMetamask)
      .then(res => setIsFollowing(true))
      .catch(error => console.error(error.message));
  };

  const unfollowArtist = (otherMetamask: string) => {
    unfollowUser(otherMetamask)
      .then(res => setIsFollowing(false))
      .catch(error => console.error(error.message));
  };

  const addToFavourite = () => console.log('add to favourite');
  const sendMessage = () => console.log('send message');
  const addToFriends = () => console.log('add to friends');

  useEffect(() => {
    getUserInfo(id) // id from param
      .then(res => {
        setIsArtist(res.data.isArtist);
        setUsername(res.data.name);
        // fetch description
        // fetch url
        setAvatar(res.data.avatarUrl);
      });

    getFollowings(id).then(res => setNumFollowings(res.data.length));

    getFollowers(id).then(res => setNumFollowers(res.data.length));

    if (account) {
      getFollowings(account) // account from login
        .then(res => {
          const followings = res.data;
          const isfollowing = followings.some((follow: any) => follow.metamaskId == id);

          setIsFollowing(isfollowing);
        });
    }
  });

  return (
    <>
      <div className={classes.intro}>
        <div className={classes.container}>
          <div className={classes.artistStatistic}>
            <div className={classes.artistStatisticItem}>
              <SaveIcon />
              {numFollowings}
            </div>
            <div className={classes.artistStatisticItem}>
              <ViewsIcon />
              {numFollowers}
            </div>
            <div className={classes.artistStatisticItem}>
              <LikeIcon />
              220
            </div>

            {account && account.toLowerCase() != id && (
              <Button
                variantCustom='action'
                className={classes.followButton}
                onClick={() => {
                  if (isFollowing) {
                    unfollowArtist(id);
                  } else {
                    followArtist(id);
                  }
                }}
              >
                {isFollowing ? text['Unfollow'] : text['follow']}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={classes.artistInfo}>
        <img src={nftImage} alt='' className={classes.nftBackgroundImage} />
        <div className={classes.container}>
          <div>
            <div className={clsx(classes.artistInfoWrapper, classes.centerAvatar)}>
              <Avatar size={140} image={avatar} alt='Jack Jackson' status='premium' />
              <div className={classes.actions}>
                <IconButton className={classes.actionsButton} onClick={handleToggleActions}>
                  <ThreeDotsIcon />
                </IconButton>

                {isOpenActions && (
                  <div className={classes.actionsList}>
                    <Button onClick={() => addToFavourite()}>Add to favorite</Button>
                    <Button onClick={() => sendMessage()}>Send message</Button>
                    <Button onClick={() => addToFriends()}>Add to friends</Button>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.artistInfoList}>
              <div>{isArtist ? 'Artist' : ''}</div>
              <div className={classes.name}>{username}</div>
              <div className={classes.code}>{id}</div>
              <div className={classes.helpText}>{description}</div>
              <a href='' className={classes.linkToWebPage}>
                {url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
