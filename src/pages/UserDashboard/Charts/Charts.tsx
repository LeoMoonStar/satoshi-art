import React from 'react';
import BidHistory from './BidHistory';
import PieChart from './PieChart';

import useStyles from './Charts.style';

export default function Charts(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.col}>
        <PieChart />
      </div>
      <div className={classes.col}>
        <BidHistory />
      </div>
    </div>
  );
}
