import React from 'react';
import text from '../../../constants/content';
import TopList from './TopList';

import useStyles from './TopSellersAndBuyers.style';

export default function TopSellersAndBuyers(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TopList titleColor='#FF0099' title={text['topSeller']} />
      <TopList titleColor='#6A2FE7' title={text['topBuyers']} />
    </div>
  );
}
