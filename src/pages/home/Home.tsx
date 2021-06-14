import React, { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Layout from 'components/layout';
import DropOfTheDay from './DropOfTheDay';
import TopSellersAndBuyers from './TopSellersAndBuyers';
import Tops from './Tops';
import Iterators from './Iterators';

import PopularWorks from './PopularWorks';
import Intro from './Intro';

const Home = (): JSX.Element => {
  return (
    <Layout headerVariant='full'>
      <Intro />
      <DropOfTheDay />
      <Iterators />
      <TopSellersAndBuyers />
      <Tops />
      <PopularWorks />
    </Layout>
  );
};

export default Home;
