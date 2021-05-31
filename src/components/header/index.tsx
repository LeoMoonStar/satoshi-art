import React, { useState, useEffect } from 'react';
import { Popper, PopperProps, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
// import cx from 'clsx';
import { getUserProfile } from 'apis/users';
import { permittedToUseWalletSelector } from 'state/app/selectors';
import Button from 'components/button';
// import UserMenu from './UserMenu';
// import Notifications from './Notifications';
import { BellIcon, NavbarBurgerIcon, FullLogo, SearchIcon, LogoHeaderWhiteIcon } from 'components/icons';
import useStyles from './header.style';
import { useConnect } from 'hooks/useDisconnect';
import { readCookie } from 'apis/cookie';
import { getCollectibleAndNumber } from 'apis/collectibles';
import Avatar from 'components/avatar';
import UserMenu from './userMenu';

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
      key={key}
      to={`/search/${name}`}
      style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', marginRight: '5px' }}
    >
      <div className={classes.searchResult}>{name}</div>
      <div> {`${number ? number : 0} items`}</div>
    </Link>
  );
};

export default function Header({ inverseHeader = false, hasDivider = true }: HeaderProps): JSX.Element {
  const classes = useStyles();
  const { account } = useWeb3React();
  const isWalletPermitted = useSelector<any, boolean>(permittedToUseWalletSelector);
  const [InSearch, setInSearch] = useState(false);
  const [searchArtist, setSearchArtist] = useState('');
  const [searchResult, setSearchResult] = useState([...mockSample]);
  const [showNotif, setShowNotif] = useState(false);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [avatar, setAvatar] = useState('');
  const connected = useConnect();
  useEffect(() => {
    if (connected) {
      const id = readCookie('id');
      if (id) {
        getUserProfile(id).then((res: any) => {
          console.log('Get user profile', res.data);
          setIsArtist(res.data.isArtist);
          setAvatar(res.data.avatarUrl);
        });
      }
    }
  });

  useEffect(() => {
    if (searchArtist) {
      getCollectibleAndNumber(searchArtist)
        .then(res => {
          const { data } = res;
          console.log(data);
          const result = Object.entries(data);
          setSearchResult(result);
        })
        .catch(err => console.log(err));
    }
  }, [searchArtist]);

  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        <Link to='/' className={classes.logo}>
          {inverseHeader ? <LogoHeaderWhiteIcon /> : <FullLogo />}
        </Link>
        {hasDivider && <div className={classes.divider} />}
      </div>

      <div className={classes.bottomRow}>
        <div className={classes.innerBottomRow}>
          <div className={classes.controls}>
            {!account && (
              <Link to={'/connect'} className={classes.connectLink}>
                <Button variantCustom='action' label={'Connect Wallet'} />
              </Link>
            )}

            {account && isWalletPermitted && (
              <div className={classes.profileBar}>
                <div className={classes.notificationBox}>
                  <div>
                    <BellIcon height='15' width='15' onClick={() => setShowNotif(!showNotif)} />
                  </div>
                </div>

                {isArtist && (
                  <Link
                    to={{
                      pathname: '/create-collectible',
                      state: { isAllowedGoBack: true },
                    }}
                    className={classes.createLink}
                  >
                    <Button variantCustom='linkButton' label={'create'} />
                  </Link>
                )}
                <UserMenu />
              </div>
            )}
          </div>

          {showNotif && <div style={{ marginLeft: 'calc(100vw - 500px)' }}>{/* <Notifications /> */}</div>}
        </div>
      </div>
      <div className={classes.div}></div>

      {window.location.pathname != '/drop-of-the-day-history' && (
        <div className={classes.searchWrapper} onMouseLeave={() => setInSearch(false)}>
          <div className={classes.searchInputContainer}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <TextField
              onMouseEnter={() => setInSearch(true)}
              onKeyUp={e => {
                if (e.keyCode == 13) location.replace('/search/' + searchArtist);
              }}
              InputProps={{
                disableUnderline: true,
                type: 'search',
                placeholder: 'by the artists, for the artists',
                classes: {
                  root: InSearch ? classes.searchInputClicked : classes.searchInputUnclick,
                },
              }}
              onChange={e => setSearchArtist(e.target.value)}
            />

            {InSearch && (
              <div className={classes.nftSearchBox}>
                {searchResult.map((item, index) => (
                  <SearchResultCell key={index} name={item[0]} classes={classes} number={item[1]} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
