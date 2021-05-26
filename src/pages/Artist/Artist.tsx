import React, { useEffect } from 'react';
import Layout from 'components/layout';
import PageDetails from 'components/widgets/PageDetails';
import ArtistWorks from './ArtistWorks';
import useWalletTokens from 'hooks/useWalletTokens';

export default function Artist(): JSX.Element {
  const userCollections = useWalletTokens();

  return (
    <Layout>
      <PageDetails />
      <ArtistWorks collectibles={userCollections} />
    </Layout>
  );
}
