import React, { useState, useEffect } from 'react';
import { Popper, PopperProps, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
// import cx from 'clsx';
import axios from 'axios';
import Web3 from 'web3';
import { getUserInfo } from 'apis/users';
import Button from 'components/button';
import { BellIcon, NavbarBurgerIcon, FullLogo, SearchIcon, LogoHeaderWhiteIcon } from 'components/icons';
import useStyles from './header.style';
import { useConnect } from 'hooks/useDisconnect';
import { isInLoginAsMode, createLoginAsCookies, eraseLoginAsCookies, readCookie } from 'apis/cookie';
import { getCollectibleAndNumber } from 'apis/collectibles';
import UserMenu from './userMenu';
import Notifications from './Notifications'
declare let window: any;

const mockSample: any[] = [['sample', 2]];
const SearchPopper = function (props: PopperProps) {
  return <Popper {...props} style={{ width: '672px' }} placement='bottom-start' />;
};

type HeaderProps = { inverseHeader?: boolean; hasDivider?: boolean };

// function processedArtist(artist: [{ name: string; id: number }]) {
//   let result: { [name: string]: number } = {};
//   for (let i of artist) {
//     if (!result[i.name]) result[i.name] = 0;
//     result[i.name]++;
//   }
//   return Object.entries(result);
// }


  
const SearchResultCell = ({ key, name, classes, number }: any) => {
  return (
    <Link
      to={`/search/${name}`}
      style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', marginRight: '5px' }}
    >
      <div className={classes.searchResult}>{name}</div>
      <div> {`${number ? number : 0} items`}</div>
    </Link>
  );
};

export default function Header({ inverseHeader = false, hasDivider = true }: HeaderProps): JSX.Element {
  const userId = readCookie("id");
  const classes = useStyles();
  const [InSearch, setInSearch] = useState(false);
  const [searches, setSearches] = useState('');
  const [searchResult, setSearchResult] = useState([...mockSample]);
  const [searchCollectible, setSearchCollectible] = useState('')
  const [showNotif, setShowNotif] = useState(false);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState('');
  const connected = useConnect();
  useEffect(() => {
    console.log('header rendered');
    if (connected) {
      const id = readCookie('id');
      if (id) {
        getUserInfo(id).then((res: any) => {
          setIsArtist(res.data.isArtist);
          console.log('setting avatar');
          setUserAvatar(res.data.avatarUrl);
        });
      }
  }})

  useEffect(() => {
    if (searches) {
      getCollectibleAndNumber(searches)
        .then(({ data }) => {
          console.log(data);
          const result = Object.entries(data);
          setSearchResult(result);
        })
        .catch(err => console.log(err));
    }

    if (userId) {
      getUserInfo(userId).then(({ data }) => {
        setIsArtist(data.isArtist);
        setUserAvatar(data.avatarUrl);
      });
    }
  }, [searches]);

  const getSearches = (name: string) => {
      getCollectibleAndNumber(name)
          .then(({ data }) => {
            setSearchResult(data)
            setSearchCollectible(name)
          })
  }

  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        <Link to='/' className={classes.logo}>{inverseHeader ? <LogoHeaderWhiteIcon /> : <FullLogo />}</Link>
        {hasDivider && <div className={classes.divider} />}
      </div>

      <div className={classes.bottomRow}>
        <div className={classes.innerBottomRow}>
          {window.location.pathname != '/drop-of-the-day' && (
            <div className={classes.searchWrapper} onMouseLeave={() => setInSearch(false)}>
              <div className={classes.searchInputContainer}>
                <div className={classes.searchIcon}><SearchIcon /></div>
                <TextField
                  onMouseEnter={() => setInSearch(true)}
                  onKeyUp={(e) => {
                      if (e.keyCode == 13) location.replace('/search/' + searchCollectible)
                  }}
                  InputProps={{
                    disableUnderline: true,
                    type: 'search',
                    placeholder: 'by the collectibles, for the collectibles',
                    classes: {
                      root: InSearch ? classes.searchInputClicked : classes.searchInputUnclick,
                    },
                  }}
                  onChange={e => {
                    setSearches(e.target.value)
                    getSearches(e.target.value)
                  }}
                />

                {InSearch && (
                  <div className={classes.nftSearchBox}>
                    {searchResult.length > 0 && searchResult.map((item: any, index: number) => (
                      <Link key={index} to={`/search/${item[1]}`} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', marginRight: '5px' }}>
                        <div className={classes.searchResult}>{item[0]}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={classes.controls}>
            {!connected && (
              <Link to={'/connect'} className={classes.connectLink}>
                <Button variantCustom='action' label={'Connect Wallet'} />
              </Link>
            )}

            {(connected && isArtist) && (
              <>
                <div className={classes.notificationBox}>
                  <div>
                    <BellIcon height='15' width='15' onClick={() => setShowNotif(!showNotif)} />
                  </div>
                </div>

                {isArtist && (
                  <Link to={{ pathname: '/create-collectible', state: { isAllowedGoBack: true }}} className={classes.createLink}>
                    <Button variantCustom='linkButton' label={'create'} />
                  </Link>
                )}
              </>
            )}

            <UserMenu avatarUrl={userAvatar} />
          </div>
        </div>
      </div>

      {showNotif && <div style={{ marginLeft: 'calc(100vw - 500px)' }}><Notifications /></div>}
    </div>
  );
}