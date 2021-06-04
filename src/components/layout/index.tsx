import React, { useEffect, useLayoutEffect } from 'react';
import Header from '../header';
import Footer from './footer';
import useStyles from './layout.style';

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
