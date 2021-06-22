import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { eraseLoginAsCookies } from 'apis/cookie';
import { disconnectAccount } from 'state/app/actions';
import { removeProfile } from 'state/auth/actions';
import Web3 from 'web3';
declare let window: any;

const web3 = new Web3(window.ethereum);
/**
 * Disconnect user wallet and clear redux state related to this wallet
 */
const useDisconnect = (): (() => void) => {
  const { deactivate } = useWeb3React();
  const dispatch = useDispatch();

  return async () => {
    deactivate();
    dispatch(disconnectAccount());
    dispatch(removeProfile());
    eraseLoginAsCookies();
    location.replace('/');
  };
};

const useConnect = (): boolean => {
  return window.ethereum && window.ethereum.selectedAddress;
};

export { useDisconnect, useConnect };
