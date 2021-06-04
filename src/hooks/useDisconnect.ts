import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { eraseLoginAsCookies } from 'apis/cookie';
import { disconnectAccount } from 'state/app/actions';
import Web3 from 'web3';
declare let window: any;

/**
 * Disconnect user wallet and clear redux state related to this wallet
 */
const useDisconnect = (): (() => void) => {
  const { deactivate } = useWeb3React();
  const dispatch = useDispatch();

  return async () => {
    deactivate();
    dispatch(disconnectAccount());
    eraseLoginAsCookies();

    location.replace('/')
  };
};

const useConnect = (): boolean => {
  return window.ethereum && window.ethereum.selectedAddress;
};

export { useDisconnect, useConnect };
