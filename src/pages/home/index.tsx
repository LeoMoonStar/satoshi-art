import React from 'react';

import Layout from 'components/layout';
import Intro from './intro';

const Home = (): JSX.Element => {
  return (
    <Layout
      headerVariant='full'
      // justifyTopRowFooter="center"
    >
      <Intro />
    </Layout>
  );
};

export default Home;
