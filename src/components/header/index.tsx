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
import { permittedToUseWalletAndWhiteListedSelector, permittedToUseWalletSelector } from 'state/app/selectors';
import { AppState } from 'state';
import { useConnect } from 'hooks/useDisconnect';
import { isInLoginAsMode, createLoginAsCookies, eraseLoginAsCookies, readCookie } from 'apis/cookie';
import { getCollectibleAndNumber } from 'apis/collectibles';
import UserMenu from './userMenu';
import Notifications from './Notifications'
declare let window: any;

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
  const [searchResult, setSearchResult] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState('');
  let { account } = useWeb3React();
  const connected = useConnect();
  const isWalletPermitted = useSelector<AppState, boolean>(permittedToUseWalletSelector);


  useEffect(() => {
    const getSignature = async() => {
        if (isWalletPermitted) {
          if (window.ethereum) {
              const web3 = new Web3(window.ethereum);
              const accounts = await web3.eth.getAccounts();

              account = accounts[0]

              try {
                  await window.ethereum.request({ method: "eth_requestAccounts" });

                  if (isInLoginAsMode()) {
                      console.log("cookie")
                      console.log("id", readCookie("id"))
                      console.log("metamask_address", readCookie("metamask_address"))
                      console.log("token", readCookie("token"))
                  } else {
                      const res = await fetch(
                          `${process.env.REACT_APP_API}/api/public/auth/${account.toLowerCase()}`
                      );
                      const challenge = await res.json();
                      
                      (web3 as any).currentProvider.send({
                          method: "eth_signTypedData",
                          params: [challenge.challenge, connected],
                          from: connected
                      },
                      (error: any, res: any) => {
                          eraseLoginAsCookies()

                          console.log("signature: " + res.result)
                          console.log("metamessage: " + challenge.challenge[1].value)
                          console.log("metasignature: " + res.result)
                          console.log("metaaddress: " + connected)
                          
                          axios.get(
                              `${process.env.REACT_APP_API}/api/public/auth/${challenge.challenge[1].value}/${res.result}/${account}`
                          ).then(sigRes => {                                 
                              if (sigRes.status === 200 && sigRes.data.recover === connected) {
                                  const { id, metamaskId, token } = sigRes.data

                                  createLoginAsCookies({ id: id, metamask_address: metamaskId, token: token })

                                  console.log("id", id)
                                  console.log("metamask_address", metamaskId)
                                  console.log("token", token)
                                  
                                  console.log("Signature verified")

                                  location.replace('/')
                              } else {
                                  console.log("Signature not verified")
                              }


                          }).catch(err => console.log(err))
                      });
                  }
              } catch (err) {
                  console.log(err)
              }
          }
        } else {
          console.log('No account detected');
        }
    }

    getSignature()

    if (userId) {
      getUserInfo(userId).then(({ data }) => {
        setIsArtist(data.isArtist);
        setUserAvatar(data.avatarUrl);
      });
    }
  }, [searches]);

  const getSearches = (name: string) => {
    if (name.length >= 2) { 
      getCollectibleAndNumber(name)
          .then(({ data }) => {
            const res: any = Object.entries(data);

            setSearchResult(res)
            setSearches(name)
          })
    }
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
                      if (e.keyCode == 13) location.replace('/search/' + searches)
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
                    {searchResult.map((item: any, index: number) => (
                      <SearchResultCell key={index} name={item[0]} classes={classes} number={item[1]} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={classes.controls}>
            {!userId && (
              <Link to={'/connect'} className={classes.connectLink}>
                <Button variantCustom='action' label={'Connect Wallet'} />
              </Link>
            )}

            {(userId) && (
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