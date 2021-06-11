import React, { useState, useEffect } from 'react';

import Layout from 'components/layout';
import History from './History';
import Introduction from './Introduction';

import { getCelebrityList } from 'apis/dropoftheday'

export default function DropOfTheDayHistory(): JSX.Element {
  const [history, setHistory] = useState([])

  useEffect(() => {
    getCelebrityList()
          .then(({ data }) => setHistory(data.previousCelebrities))
  })

  return (
    <Layout headerVariant='full'>
      <Introduction numitems={history.length}/>
      <History items={history}/>
    </Layout>
  );
}
