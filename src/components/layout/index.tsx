import React, { useState, useEffect } from 'react';
import Header from '../header';
import Footer from './footer';
import useStyles from './layout.style';
import { isInLoginAsMode, createLoginAsCookies, eraseLoginAsCookies, readCookie } from 'apis/cookie';
import Web3 from 'web3';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { useConnect } from 'hooks/useDisconnect';
import Popup from 'components/widgets/Popup';

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
  //useUserWhiteListChecking();

  let { account } = useWeb3React();
  // const connected = useConnect();
  const sign = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    if (window.ethereum.selectedAddress) {
      // resolve temporary problem
      if (window.ethereum) {
        console.log('Accounts', accounts);
        account = accounts[0];
        try {
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          });

          if (isInLoginAsMode()) {
            console.log('user sign in');

            console.log("id", readCookie("id"))
            console.log("token", readCookie("token"))
            console.log("metamask_address", readCookie("metamask_address"))
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
                    if (sigRes.status === 200 && sigRes.data.recover === account!.toLowerCase()) {
                      console.log('Signature verified');
                      createLoginAsCookies({
                        id: sigRes.data.id,
                        metamask_address: sigRes.data.metamaskId,
                        token: sigRes.data.token,
                      });

                      console.log("id", sigRes.data.id)
                      console.log("token", sigRes.data.token)
                      console.log("metamask_address", sigRes.data.metamaskId)

                      setShowPopup(true)
                    } else {
                      setShowFailedPopup(true)
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
      eraseLoginAsCookies();
    }
  };
  const [showPopup, setShowPopup] = useState(false)
  const [showFailedPopup, setShowFailedPopup] = useState(false)

  useEffect(() => {
    sign();
  }, [window.ethereum.selectedAddress]);

  // useEffect(() => {
  //   window.ethereum.on('disconnect', () => {
  //     console.log('detect disconnection');
  //   });
  // });

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
      <Popup open={showPopup} textheader={"Connected wallet;;You successfully connected the wallet"} onClose={() => {
        setShowPopup(false)
        location.replace("/")
      }}></Popup>
      <Popup open={showFailedPopup} textheader={"Connected wallet;;You failed to connect the wallet"} onClose={() => setShowFailedPopup(false)}></Popup>
    </div>
  );
};

export default Layout;