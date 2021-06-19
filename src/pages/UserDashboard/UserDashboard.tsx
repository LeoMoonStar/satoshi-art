import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import DashboardLayout from 'components/widgets/DashboardLayout';
import useStyles from './UserDashboard.style';

import { YourLatestBids, Collections, Created, OnSale } from './Tokens';
import Intro from './Intro';
import CardsStatistics from './CardsStatistics';
import Charts from './Charts';
import FollowingAndFollowers from './FollowingAndFollowers';

export default function UserDashboard(): JSX.Element {
  const classes = useStyles();
  // todo: move all sliders in separate component with state outOfDatesSliders. It allow us avoid useless
  //  rerender for charts
  const [outOfDatesSliders, setOutOfDatesSliders] = useState<Record<string, any>>({ onSale: true, created: true });
  const [searchStart, setSearchStart] = useState("")
  const [searchEnd, setsearchEnd] = useState("")
  const setSearchPeriod = (startdate:any, enddate:any) => {
    setSearchStart(startdate)
    setsearchEnd(enddate)

  }
  console.log("called in set search date,",searchStart,searchEnd)

  return (
    <DashboardLayout>
      <div className={classes.container}>
        <Intro setSearchPeriod={setSearchPeriod}/>
        <CardsStatistics />
        <Charts searchStart={parseInt(searchStart)} searchEnd={parseInt(searchEnd)}/>
        <YourLatestBids />
        <OnSale isOutOfDate={outOfDatesSliders.onSale} />
        <Collections />
        <Created setOutOfDatesSliders={(state: any) => setOutOfDatesSliders({ ...outOfDatesSliders, ...state })} />
        <FollowingAndFollowers />
      </div>
    </DashboardLayout>
  );
}
