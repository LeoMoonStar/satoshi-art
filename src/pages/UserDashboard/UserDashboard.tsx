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

  return (
    <DashboardLayout>
      <div className={classes.container}>
        <Intro />
        <CardsStatistics />
        <Charts />
        <YourLatestBids />
        <OnSale isOutOfDate={outOfDatesSliders.onSale} />
        <Collections />
        <Created setOutOfDatesSliders={(state: any) => setOutOfDatesSliders({ ...outOfDatesSliders, ...state })} />
        <FollowingAndFollowers />
      </div>
    </DashboardLayout>
  );
}
