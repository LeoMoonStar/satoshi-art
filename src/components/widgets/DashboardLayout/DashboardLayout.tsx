import React from 'react';

import Sidebar from './Sidebar';
import Header from '../../header';

import useStyles from './DashboardLayout.style';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.container}>
        <div className={classes.sideBar}>
          <Sidebar />
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
}
