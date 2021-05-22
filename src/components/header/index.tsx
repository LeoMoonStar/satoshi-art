import React, { useState, useEffect } from 'react';
import { Popper, PopperProps, TextField } from '@material-ui/core';
import { isInLoginAsMode, createLoginAsCookies, eraseLoginAsCookies } from 'apis/cookie';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
// import cx from 'clsx';
import { getUserProfile } from 'apis/users';
import axios from 'axios';
import Web3 from 'web3';
import { permittedToUseWalletSelector } from 'state/app/selectors';
import Button from 'components/button';
// import UserMenu from './UserMenu';
// import Notifications from './Notifications';
import { BellIcon, NavbarBurgerIcon, FullLogo, SearchIcon, LogoHeaderWhiteIcon } from 'components/icons';
import useStyles from './header.style';

const artists: any[] = [
  { id: 1, name: 'this' },
  { id: 2, name: 'this' },
  { id: 3, name: 'this' },
  { id: 4, name: 'this' },
  { id: 5, name: 'this' },
  { id: 6, name: 'this' },
  { id: 7, name: 'this' },
  { id: 8, name: 'this' },
  { id: 9, name: 'this' },
  { id: 10, name: 'this' },
  { id: 11, name: 'this' },
  { id: 12, name: 'this' },
  { id: 13, name: 'this' },
  { id: 14, name: 'this' },
];
const SearchPopper = function (props: PopperProps) {
  return <Popper {...props} style={{ width: '672px' }} placement='bottom-start' />;
};

type HeaderProps = { inverseHeader?: boolean; hasDivider?: boolean };

export default function Header({ inverseHeader = false, hasDivider = true }: HeaderProps): JSX.Element {
  const classes = useStyles();

  const { account } = useWeb3React();

  const isWalletPermitted = useSelector<any, boolean>(permittedToUseWalletSelector);
  const [InSearch, setInSearch] = useState(false);
  const [searchArtist, setSearchArtist] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (account) {
      getUserProfile(account.toLowerCase()).then((res: any) => {
        setIsArtist(res.data.isArtist);
        setAvatar(res.data.avatarUrl);
      });
    }
  });

  return (
    <div className={classes.container}>
      {/*<div className={classes.topNavs}>
                <Link to="/" className={cx(classes.topNav)}>{t('howItWorks')}</Link>
                <Link to="/" className={cx(classes.topNav)}>{t('Community')}</Link>
                <Link to="/" className={cx(classes.topNav)}>{t('Following')}</Link>
            </div>*/}
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
              <>
                <div className={classes.notificationBox}>
                  {/*<div><NavbarBurgerIcon height="15" width="15"/></div>*/}
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
              </>
            )}

            {/* <UserMenu /> */}
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
                {artists.map((artist, index) => (
                  <Link key={index} to={`/search/${artist.name}`} style={{ textDecoration: 'none' }}>
                    <div className={classes.searchResult}>{artist.name}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/*<div className={classes.bottomNavs}>
                        <Link to="/" className={cx(classes.bottomNav)}>{t('howItWorks')}</Link>
                        <Link to="/" className={cx(classes.bottomNav)}>{t('Community')}</Link>
                        <Link to="/" className={cx(classes.bottomNav)}>{t('Following')}</Link>
                    </div>*/}
        </div>
      )}
    </div>
  );
}
