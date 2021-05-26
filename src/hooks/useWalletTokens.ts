import { useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { getCollectibles, Collectible } from 'apis/collectibles';
import { APIErrorContext } from '../components/provider/APIErrorProvider';
import text from '../../public/content';

const useWalletTokens = () => {
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const { account } = useWeb3React();
  const { setError } = useContext(APIErrorContext);

  useEffect(() => {
    if (!account) return;

    getCollectibles()
      .then(res => setCollectibles(res.data))
      .catch(err => setError(text['tokensLoadingFailed'], JSON.stringify(err.data, null, 2)));
  }, [account, setError]);

  return collectibles;
};

export default useWalletTokens;
