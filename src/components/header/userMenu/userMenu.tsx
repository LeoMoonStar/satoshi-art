import React, { useMemo, useRef, useState, useEffect } from 'react';
import { IconButton, Popover } from '@material-ui/core';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { permittedToUseWalletAndWhiteListedSelector, permittedToUseWalletSelector } from 'state/app/selectors';
import { shortAddress } from 'utils/helpers';
import Web3 from 'web3';

import Avatar from 'components/avatar';
import { CopyIcon, BalanceIcon, ProfileIcon, ItemsIcon, DisconnectIcon } from 'components/icons';
import { TotalBidsIcon } from 'components/icons/dashboard';
import avatar from 'components/images/artist/avatar.jpg';
import { useDisconnect } from 'hooks/useDisconnect';
import { getUserInfo } from 'apis/users';
import { getBalance } from 'apis/collectibles'
import text from 'constants/content';
import useStyles from './userMenu.style';
import { readCookie } from '../../../apis/cookie';
declare let window: any;

const userLinks = [{ title: 'myItems', href: '/dashboard/user', icon: <ItemsIcon /> }];

// TEMPORARY
if (process.env.REACT_APP_SPECIAL_MODE !== 'production') {
  userLinks.push({ title: 'editProfile', href: '/edit-profile', icon: <ProfileIcon /> });
}

const userId: any = readCookie('id')
getUserInfo(userId).then(({ data }) => {
  console.log(userId)
  if(data.isCelebrity){
    userLinks.push({ title: 'editCelebrityProfile', href: `/edit-celebrity-profile/${userId}`, icon: <ProfileIcon /> });
  }
});

const UserMenu = ({ avatarUrl }: { avatarUrl: string }): JSX.Element | null => {
  
  const classes = useStyles();
  const anchorElRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState('');
  const { library } = useWeb3React<Web3Provider>();
  const [account, setAccount] = useState<string>('');
  const isWalletPermitted = useSelector<AppState, boolean>(permittedToUseWalletSelector);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState('');
  const handleDisconnect = useDisconnect();
  const isWhiteListedAndHasPermittedWallet = useSelector<AppState, boolean>(permittedToUseWalletAndWhiteListedSelector);
  const Id = window.ethereum.selectedAddress ? readCookie('id') : null;
  const [celebrity, setCelebrity] = useState(false);
  const randUsername = "satoshi.art" + " user_" + Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  useEffect(() => {
    async function getBalance() {
      if (window.ethereum.selectedAddress) {
        const web3 = new Web3(window.ethereum);
        const Accounts = await web3.eth.getAccounts();
        setAccount(Accounts[0]);
        const userEthBalance = await web3.eth.getBalance(window.ethereum.selectedAddress);
        console.log('Balance', userEthBalance);
        setBalance(ethers.utils.formatEther(userEthBalance).substring(0, 5));
      }
    }
    getBalance();
   

    if (Id) {
      getUserInfo(Id).then(({ data }) => {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
        // console.log(data)
        
        setIsArtist(data.isArtist);
        setUserAvatar(data.avatarUrl);
        setCelebrity(data.isCelebrity)


      });
    }
    
    // checkCeleb()
  }, [account, library, isWalletPermitted]);

  // const checkCeleb = () =>{
   
  // }
  console.log("user account",account)
  const userAddress = useMemo(() => {
    if (!!account) return shortAddress(account, 10);
  }, [account]);
  // console.log("in userMenu", avatarUrl)
  // console.log("seleceted address", window.ethereum.selectedAddress, "walletpermitted",useSelector<AppState, boolean>(permittedToUseWalletSelector))
  if (!window.ethereum.selectedAddress || !isWalletPermitted) return null;

  return (
    <div
      className={classes.userMenu}
      onMouseEnter={() => {
        console.log('Mouse over');
        setOpen(!isOpen);
      }}
      onMouseLeave={() => {
        setOpen(!isOpen);
      }}
    > 

      <div ref={anchorElRef}>
     
        {/* {console.log(avatarUrl)} */}
        {/* <Link to='/dashboard/user'> */}
          <Avatar size={40} image={avatarUrl ? avatarUrl : avatar} />
        {/* </Link> */}
      </div>

      <Popover open={isOpen} anchorEl={anchorElRef?.current} onClose={() => setOpen(false)} classes={{ root: classes.popover }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <div>
          <div className={classes.nickName}>
       
            {randUsername}
        
            <IconButton onClick={() => navigator.clipboard.writeText(account)}><CopyIcon /></IconButton>
          </div>
          <ul className={classes.balances}>
            <li>
              <BalanceIcon />
              <div className={classes.balance}>
                <span>Balance</span>
                <span>{balance} ETH</span>
              </div>
            </li>

            <div className={classes.managefunds}>Manage funds on Zerion</div>
          </ul>

          {!isWhiteListedAndHasPermittedWallet && (
            <ul className={classes.links}>
              {userLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>
                    {link.icon}
                    <span>{text[link.title]}</span>
                  </Link>
                </li>
              ))}
              <button type='button' className={classes.btnDisconnect} onClick={handleDisconnect}>
                <DisconnectIcon />
                {text['disconnect']}
              </button>
            </ul>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default UserMenu;
