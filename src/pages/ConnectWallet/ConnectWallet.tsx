import React from 'react';

import Footer from 'components/layout/footer';
import Wallets from './Wallets';

import useStyles from './ConnectWallet.style';

export default function ConnectWallet(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Wallets />
      </div>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
}
