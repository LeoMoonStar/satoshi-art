import React, { useState, useEffect } from 'react';
import Layout from 'components/layout';
import PageDetails from 'components/widgets/PageDetails';
import ArtistWorks from './ArtistWorks';
import useWalletTokens from 'hooks/useWalletTokens';
import { getCollectibles } from 'apis/collectibles'

export default function Artist(): JSX.Element {
  const [collectibles, setCollectibles] = useState([])

  useEffect(() => {
      getCollectibles()
          .then(({ data }) => {
              setCollectibles(data)
          })
  })

  return (
    <Layout>
      <PageDetails />
      <ArtistWorks collectibles={collectibles} />
    </Layout>
  );
}
