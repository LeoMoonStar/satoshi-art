import React, { useEffect, useLayoutEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useUserWhiteListChecking } from 'state/app/updater';
import Header from '../header';
import Footer from './footer';
import { isInLoginAsMode, createLoginAsCookies, eraseLoginAsCookies } from 'apis/cookie';
import Web3 from 'web3';
import axios from 'axios';
import useStyles from './layout.style';
import { useConnect } from 'hooks/useDisconnect';
import { readCookie } from '../../apis/cookie';

declare let window: any;

type HeaderVariants = 'none' | 'full';

type ILayoutProps = {
  children: React.ReactNode;
  headerVariant?: HeaderVariants;
  isHeaderVisible?: boolean;
  // justifyTopRowFooter?: JustifyTopRowFooter
  containerPaddingTop?: number;
  headerBackground?: string;
  positionHeader?: 'sticky' | 'absolute' | 'fixed';
  inverseHeader?: boolean;
  hasHeaderDivider?: boolean;
};

const Layout = ({
  children,
  positionHeader = 'sticky',
  containerPaddingTop = 45,
  headerBackground = '#fff',
  inverseHeader = false,
  isHeaderVisible = true,
  hasHeaderDivider = true,
}: // justifyTopRowFooter,
ILayoutProps): JSX.Element => {
  const classes = useStyles();
  useUserWhiteListChecking();
  let { account } = useWeb3React();
  // const { account } = useWeb3React();
  const connected = useConnect();
  const sign = async () => {
    console.log('Use effect triggered');
    if (connected) {
      // resolve temporary problem
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts', accounts);
        account = accounts[0];
        try {
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          });

          if (isInLoginAsMode()) {
            console.log('user sign in');
          } else {
            console.log(`Account before get challenge ${account}`);
            const res = await axios.get(`${process.env.REACT_APP_API}/api/public/auth/${account.toLowerCase()}`);
            const challenge = res.data;

            (web3 as any).currentProvider.send(
              {
                method: 'eth_signTypedData',
                params: [challenge.challenge, account],
                from: account,
              },
              (error: any, res: any) => {
                eraseLoginAsCookies();
                axios
                  .get(
                    `${process.env.REACT_APP_API}/api/public/auth/${challenge.challenge[1].value}/${res.result}/${account}`
                  )
                  .then(sigRes => {
                    console.log(sigRes.status);
                    console.log(sigRes.data.recover, account);

                    if (sigRes.status === 200 && sigRes.data.recover === account!.toLowerCase()) {
                      console.log('Signature verified');
                      createLoginAsCookies({
                        id: sigRes.data.id,
                        metamask_address: sigRes.data.metamaskId,
                        token: sigRes.data.token,
                      });
                    } else {
                      console.log('Signature not verified');
                    }
                  })
                  .catch(err => console.log(err));
              }
            );
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log('No account detected');
      //eraseLoginAsCookies();
    }
  };
  useEffect(() => {
    sign();
  });

  return (
    <div className={classes.container}>
      <div
        className={classes.header}
        style={{
          backgroundColor: headerBackground,
          position: positionHeader,
        }}
      >
        {isHeaderVisible && <Header hasDivider={hasHeaderDivider} inverseHeader={inverseHeader} />}
      </div>
      <div style={{ paddingTop: containerPaddingTop }} className={classes.content}>
        {children}
      </div>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
