import React from 'react';

import Layout from 'components/layout';
import DropOfTheDayInDetails from './DropOfTheDayInDetails';
import DropOfTheDayWorkCards from './DropOfTheDayWorkCards';
import SpecialEdition from './SpecialEdition';
import LaunchTime from './LaunchTime';
import TopSeries from './TheSeries';
import Introduction from './Introduction';

export default function DropOfTheDay(): JSX.Element {
  return (
    <Layout
      hasHeaderDivider={false}
      containerPaddingTop={0}
      headerBackground='transparent'
      inverseHeader
      positionHeader='absolute'
    >
      <Introduction />
      <TopSeries />
      <LaunchTime />
      <SpecialEdition />
      <DropOfTheDayWorkCards />
      <DropOfTheDayInDetails />
    </Layout>
  );
}
