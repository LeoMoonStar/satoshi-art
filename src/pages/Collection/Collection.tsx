import React from 'react';
import Layout from 'components/layout';

import PageDetails from 'components/widgets/PageDetails';
import CollectionWorks from './CollectionWorks';

export default function Collection(): JSX.Element {
  return (
    <Layout>
      <PageDetails />
      <CollectionWorks />
    </Layout>
  );
}
