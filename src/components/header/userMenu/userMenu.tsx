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

import Avatar from 'components/avatar';
import { CopyIcon, BalanceIcon, ProfileIcon, ItemsIcon, DisconnectIcon } from 'components/icons';
import { TotalBidsIcon } from 'components/icons/dashboard';
import avatar from 'components/images/artist/avatar.jpg';
import { useConnect, useDisconnect } from 'hooks/useDisconnect';
import { getUserInfo } from 'apis/users';
import { getBalance } from 'apis/collectibles'
import text from 'constants/content';
import useStyles from './userMenu.style';
import { readCookie } from '../../../apis/cookie';

const userLinks = [{ title: 'myItems', href: '/dashboard/user', icon: <ItemsIcon /> }];

// TEMPORARY
if (process.env.REACT_APP_SPECIAL_MODE !== 'production') {
  userLinks.push({ title: 'editProfile', href: '/edit-profile', icon: <ProfileIcon /> });
}

const UserMenu = (): JSX.Element | null => {
  const classes = useStyles();
  const anchorElRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState('');
  const { library } = useWeb3React<Web3Provider>();
  const isWalletPermitted = useSelector<AppState, boolean>(permittedToUseWalletSelector);
  const handleDisconnect = useDisconnect();
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState('');
  const isWhiteListedAndHasPermittedWallet = useSelector<AppState, boolean>(permittedToUseWalletAndWhiteListedSelector);
  const connected = useConnect()
  const { account } = useWeb3React();
  const Id = account ? readCookie('id') : null

  useEffect(() => {
    async function getBalance() {
      if (library && account && isWalletPermitted) {
        const userEthBalance = await library.getBalance(account);

        setBalance(ethers.utils.formatEther(userEthBalance).substring(0, 5));
      }
    }
    getBalance();

    if (account) {
      getUserInfo(Id!).then(({ data }) => {
        setIsArtist(data.isArtist);
        setUserAvatar(data.avatarUrl);
      });

      getBalance()
        .then((res: any) => setBalance(res))
    }
  }, [account, library, isWalletPermitted]);

  const userAddress = useMemo(() => {
    if (!!account) return shortAddress(account, 10);
  }, [account]);

  if (!account) return null;

  return (
    <div className={classes.userMenu}>
      <Link to='/dashboard/user'>
        <div ref={anchorElRef} onMouseEnter={() => setOpen(!isOpen)}>
            <Avatar size={40} image={userAvatar ? userAvatar : avatar}/>
        </div>
      </Link>

      <Popover open={isOpen} anchorEl={anchorElRef?.current} onClose={() => setOpen(false)} classes={{ root: classes.popover }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <div>
          <div className={classes.nickName}>
            {userAddress}
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
