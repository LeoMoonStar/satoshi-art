import React from 'react';

import Layout from 'components/layout';
import Intro from './intro';
import Tops from './Tops';
import TopSellerAndBuyers from './TopSellersAndBuyers';

const Home = (): JSX.Element => {
  return (
    <Layout headerVariant='full'>
      <Intro />
    </Layout>
  );
};

export default Home;
