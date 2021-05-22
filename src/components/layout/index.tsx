import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useUserWhiteListChecking } from 'state/app/updater';
import Header from '../header';
import Footer from './footer';
import { isInLoginAsMode, createLoginAsCookies, eraseLoginAsCookies } from 'apis/cookie';
import Web3 from 'web3';
import axios from 'axios';
import useStyles from './layout.style';
// import { JustifyTopRowFooter } from './Footer/Footer'

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

  const { account } = useWeb3React();
  useEffect(() => {
    const sign = async () => {
      if (account) {
        if ((window as any).ethereum) {
          const web3 = new Web3((window as any).ethereum);

          try {
            await (window as any).ethereum.request({
              method: 'eth_requestAccounts',
            });

            if (isInLoginAsMode()) {
              console.log('user sign in');
            } else {
              const res = await axios.get(
                `${process.env.REACT_APP_API_NEWURL}/api/public/auth/${account.toLowerCase()}`
              );

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
                      `${process.env.REACT_APP_API_NEWURL}/api/public/auth/${challenge.challenge[1].value}/${res.result}/${account}`
                    )
                    .then(sigRes => {
                      console.log(sigRes.status);
                      console.log(sigRes.data.recover, account);

                      if (sigRes.status === 200 && sigRes.data.recover === account.toLowerCase()) {
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
        eraseLoginAsCookies();
      }
    };
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
        <Footer
        // justifyTopRow={justifyTopRowFooter}
        />
      </footer>
    </div>
  );
};

export default Layout;
