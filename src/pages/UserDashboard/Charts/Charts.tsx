import React, { useState, useEffect } from 'react';
import BidHistory from './BidHistory';
import PieChart from './PieChart';

import useStyles from './Charts.style';

export default function Charts({searchStart, searchEnd}:{searchStart:number,searchEnd:number}): JSX.Element {
  const classes = useStyles();
  // const [historyStart, setHistoryStart] = useState(0)
  // const [historyEnd, sethistoryEnd] = useState(0)
  // setHistoryStart(searchStart)
  // sethistoryEnd(searchEnd)

  return (
    <div className={classes.container}>
      <div className={classes.col}>
        <PieChart />
      </div>
      <div className={classes.col}>
        <BidHistory searchStart={searchStart} searchEnd={searchEnd}/>
      </div>
    </div>
  );
}
