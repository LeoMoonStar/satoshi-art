import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { IconButton } from '@material-ui/core';
import text from 'constants/content';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { followUser, unfollowUser, userBecomeArtist, getUserInfo, getFollowers, getFollowings } from 'apis/users';
import Popup from 'components/widgets/Popup';

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
  const [userId, setUserId] = useState('')
  const [isArtist, setIsArtist] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('Good collection. Stay tune'); // fetch from server
  const [url, setUrl] = useState('twitter.com/username'); // fetch from server
  const [avatar, setAvatar] = useState('');
  const [cover, setCover] = useState('')
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowings, setNumFollowings] = useState(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isFollower, setIsFollower] = useState<boolean>(false)

  const handleToggleActions = () => {
    setIsOpenActions(!isOpenActions);
  };

  const followArtist = (userId: string) => {
    followUser(userId)
      .then(res => {
        setIsFollowing(true)
        setShowFollowPopup(true)
      })
      .catch(error => console.error(error.message));
  };

  const unfollowArtist = (userId: string) => {
    unfollowUser(userId)
      .then(res => {
        setIsFollowing(false)
        setShowUnfollowPopup(true)
      })
      .catch(error => console.error(error.message));
  };

  const becomeArtist = () => {
      userBecomeArtist()
          .then((res) => setIsArtist(true))
  }

  const addToFavourite = () => console.log('add to favourite');
  const sendMessage = () => console.log('send message');
  const addToFriends = () => console.log('add to friends');
  const [showFollowPopup, setShowFollowPopup] = useState(false)
  const [showUnfollowPopup, setShowUnfollowPopup] = useState(false)

  useEffect(() => {
    if (account) {
      getUserInfo(id)
        .then(({ data }) => {
          setUserId(data.id)
          setIsArtist(data.isArtist);
          setUsername(data.name);
          // fetch description
          // fetch url
          setAvatar(data.avatarUrl);
          setCover(data.coverUrl)
        });
      getFollowings(id) // account from login
        .then(({ data }) => {
          const isfollowing = data.some((follow: any) => follow.metamaskId == id);

          setIsFollowing(isfollowing);
        });
      getFollowers(id)
        .then(({ data }) => {
            const isfollow = data.some((follow: any) => follow.id == account)

            setIsFollower(isfollow)
        })

      getFollowings(id).then(({ data }) => setNumFollowings(data.length));
      getFollowers(id).then(({ data }) => setNumFollowers(data.length));
    }
  }, []);
  
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

            {userId != id ?
              <Button
                variantCustom='action'
                className={classes.actionButton}
                onClick={() => {
                  if (isFollowing || isFollower) {
                    unfollowArtist(id);
                  } else {
                    followArtist(id);
                  }
                }}
              >
                {isFollowing || isFollower ? text['Unfollow'] : text['follow']}
              </Button>
              :
              <Button variantCustom="action" className={classes.actionButton} onClick={() => becomeArtist()}>{!isArtist && text['becomeArtist']}</Button>
            }
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
              <div className={classes.helpText}>{description}</div>
              <a href='' className={classes.linkToWebPage}>
                {url}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Popup open={showFollowPopup} textheader={"Follow;;You followed " + username} onClose={() => setShowFollowPopup(false)}></Popup>
      <Popup open={showUnfollowPopup} textheader={"Unfollow;;You unfollowed " + username} onClose={() => setShowUnfollowPopup(false)}></Popup>
    </>
  );
}
