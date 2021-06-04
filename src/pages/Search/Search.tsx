import React, { useState, useEffect } from 'react';

import Layout from 'components/layout';
import SearchResults from './SearchResults';
import { useParams } from 'react-router-dom';
import { getTokens, Token } from 'apis/token';
import { getCollectibles, Collectible } from 'apis/collectibles';

function Search(): JSX.Element {
  const [collectibles, setCollectibles] = useState<Collectible[]>();
  const { artist } = useParams<{ artist: string }>();

  useEffect(() => {
    /*getTokens({ sort: 'published_at:desc' }).then((tokens) =>
            setTokens(tokens)
        )*/

    getCollectibles(artist).then(({ data }) => {
      setCollectibles(data);
    });
  }, []);

  return (
    <Layout>
      <SearchResults collectibles={collectibles} />
    </Layout>
  );
}

export default Search;
