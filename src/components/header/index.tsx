import React, { useState, useEffect } from 'react';
import { Popper, PopperProps, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from 'components/button';
import { BellIcon, FullLogo, SearchIcon, LogoHeaderWhiteIcon } from 'components/icons';
import useStyles from './header.style';
import { readCookie } from 'apis/cookie';
import { getCollectibleAndNumber } from 'apis/collectibles';
import UserMenu from './userMenu';
import Notifications from './Notifications';
import { getProfile } from '../../hooks/useProfile';
import { useUserProfile } from '../../state/auth/hooks';
import { useDispatch } from 'react-redux';
import { useConnect } from 'hooks/useDisconnect';

import Web3 from 'web3';
declare let window: any;

const SearchPopper = function (props: PopperProps) {
  return <Popper {...props} style={{ width: '672px' }} placement='bottom-start' />;
};

type HeaderProps = { inverseHeader?: boolean; hasDivider?: boolean };

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
  const userId = readCookie('id');
  const classes = useStyles();
  const [InSearch, setInSearch] = useState(false);
  const [searches, setSearches] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const profile = useUserProfile();
  const dispatch = useDispatch();
  //let { account } = useWeb3React();
  const connected = useConnect();

  const getSearches = (name: string) => {
    if (name.length >= 2) {
      getCollectibleAndNumber(name).then(({ data }) => {
        const res: any = Object.entries(data);
        setSearchResult(res);
        setSearches(name);
      });
    }
  };

  useEffect(() => {
    if (userId) {
      console.log('Getting user profile in header');
      getProfile(userId, profile, dispatch);
    }
    // if(window.ethereum){
    //   //alert('undefined');

    // }
    const web3 = new Web3(window.ethereum);
    window.ethereum.on('accountsChanged', async (acc: any) => {
      setAccounts(acc);
      //const account = acc[0];
      // try {
      //   const res = await axios.get(`${process.env.REACT_APP_API}/api/public/auth/${account.toLowerCase()}`);
      // const challenge = res.data;
      // console.log('res.data!!!',res.data);
      // (web3 as any).currentProvider.send(
      //   {
      //     method: 'eth_signTypedData',
      //     params: [challenge.challenge, account],
      //     from: account,
      //   },
      //   (error: any, res: any) => {
      //     if (error) {
      //       eraseLoginAsCookies();
      //       // change redux value of connection
      //     }
      //     if (res) {
      //       eraseLoginAsCookies();
      //       console.log('challenge.challenge[1].value',challenge.challenge[1].value)
      //       console.log('res.result',res.result)
      //       console.log('res.account',account)
      //       console.log('if res', res)
      //       axios
      //         .get(
      //           `${process.env.REACT_APP_API}/api/public/auth/${challenge.challenge[1].value}/${res.result}/${account.toLowerCase()}`
      //         )
      //         .then(sigRes => {
      //           if (sigRes.status === 200 && sigRes.data.recover === account!.toLowerCase()) {
      //             console.log('Signature verified');
      //             createLoginAsCookies({
      //               id: sigRes.data.id,
      //               metamask_address: sigRes.data.metamaskId,
      //               token: sigRes.data.token,
      //             });

      //             console.log('id', sigRes.data.id);
      //             console.log('token', sigRes.data.token);
      //             console.log('metamask_address', sigRes.data.metamaskId);

      //             //setShowPopup(true);
      //             //setShowConnectionPopup(false);
      //           } else {
      //             //setShowFailedPopup(true);
      //             console.log('Signature not verified');
      //           }
      //         })
      //         .catch(err => console.log(err));
      //     }
      //   }
      // );
      // } catch (error) {
      //   console.log(error.message)
      // }
    });
  }, []);

  const isReady = () => {
    return window.ethereum != undefined;
  };
  return (
    <>
      {/* {isReady()?( */}

      <div className={classes.container}>
        {/*<div className={classes.topRow}>
          <Link to='/' className={classes.logo}>
            {inverseHeader ? <LogoHeaderWhiteIcon /> : <FullLogo />}
          </Link>
          {hasDivider && <div className={classes.divider} />}
        </div>
        <div className={classes.bottomRow}>
          <div className={classes.innerBottomRow}>
            {window.location.pathname != '/drop-of-the-day' && (
              <div className={classes.searchWrapper} onMouseLeave={() => setInSearch(false)}>
                <div className={classes.searchInputContainer}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <TextField
                    onMouseEnter={() => setInSearch(true)}
                    onKeyUp={e => {
                      if (e.keyCode == 13) location.replace('/search/' + searches);
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
                      setSearches(e.target.value);
                      getSearches(e.target.value);
                    }}
                  />
                  {InSearch && (
                    <div className={classes.nftSearchBox}>
                      {searchResult.map((item: any, index: number) => (
                        <SearchResultCell key={index} name={item[0]} classes={classes} number={item[1]} />
                      ))}
                    </div>
                  )}*/}

        <div className={classes.topRow}>
          <Link to='/' className={classes.logo}>
            {inverseHeader ? <LogoHeaderWhiteIcon /> : <FullLogo />}
          </Link>
          <div className={classes.topNav}>
            <Link to='/videos' style={{ color: 'grey', textDecoration: 'none' }}>
              How it works
            </Link>
          </div>
          {hasDivider && <div className={classes.divider} />}
          {window.location.pathname != '/drop-of-the-day' && (
            <div className={classes.searchWrapper} onMouseLeave={() => setInSearch(false)}>
              <div className={classes.searchInputContainer}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <TextField
                  onMouseEnter={() => setInSearch(true)}
                  onKeyUp={e => {
                    if (e.keyCode == 13) location.replace('/search/' + searches);
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
                    setSearches(e.target.value);
                    getSearches(e.target.value);
                  }}
                />

                {InSearch && (
                  <div className={classes.nftSearchBox}>
                    {searchResult.map((item: any, index: number) => (
                      <SearchResultCell key={index} name={item[0]} classes={classes} number={item[1]} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={classes.bottomRow}>
          <div className={classes.innerBottomRow}>
            <>
              {window.ethereum == undefined ? (
                <>
                  {console.log('!!!!', window.ethereum)}

                  <div className={classes.profileBar}>
                    <div className={classes.notificationBox}>
                      <div>
                        <BellIcon height='15' width='15' onClick={() => setShowNotif(!showNotif)} />
                      </div>
                    </div>
                    <Link to={'/connect'} className={classes.connectLink}>
                      <Button variantCustom='action' label={'Connect Wallet'} />
                    </Link>
                  </div>
                </>
              ) : null}
              {!connected ? (
                <>
                  {/* {console.log('!!!!window ethereum', window.ethereum)}
                {console.log('accounts length', accounts.length)} */}
                  {console.log('accounts connected', connected)}
                </>
              ) : (
                <div className={classes.profileBar}>
                  <div className={classes.notificationBox}>
                    <div>
                      <BellIcon height='15' width='15' onClick={() => setShowNotif(!showNotif)} />
                    </div>
                  </div>
                  {profile.isArtist && (
                    <>
                      <Link
                        to={{
                          pathname: '/create-collectible',
                          state: { isAllowedGoBack: true },
                        }}
                        className={classes.createLink}
                      >
                        <Button variantCustom='linkButton' label={'create'} />
                      </Link>
                    </>
                  )}
                  <UserMenu avatarUrl={profile.avatar} accounts={accounts} />
                </div>
              )}
            </>
          </div>
        </div>

        {/* {hasDivider && <div className={classes.divider} />} */}

        {showNotif && (
          <div style={{ marginLeft: 'calc(100vw - 500px)' }}>
            <Notifications />
          </div>
        )}
      </div>
    </>
  );
}

{
  /* ):(

      {window.location.pathname != '/drop-of-the-day' && (
        <div className={classes.searchWrapper} onMouseLeave={() => setInSearch(false)}>
          <div className={classes.searchInputContainer}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <TextField
              onMouseEnter={() => setInSearch(true)}
              onKeyUp={e => {
                if (e.keyCode == 13) location.replace('/search/' + searches);
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
                setSearches(e.target.value);
                getSearches(e.target.value);
              }}
            />

            {InSearch && (
              <div className={classes.nftSearchBox}>
                {searchResult.map((item: any, index: number) => (
                  <SearchResultCell key={index} name={item[0]} classes={classes} number={item[1]} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}



      {showNotif && (
        <div style={{ marginLeft: 'calc(100vw - 500px)' }}>
          <Notifications />
        </div>
      )}
    </div>
      
    {/* ):(

      <p>Loading...!</p>
    )} */
}
