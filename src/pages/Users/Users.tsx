import React, { useState, useEffect } from 'react';
import { getTopSellers, getTopBuyers, getTopCollectors, getTopArtists } from 'apis/users'

import Layout from 'components/layout';
import UserList from './UsersList';
import Introduction from './Introduction';

export default function Users() {
  const [subject, setSubject] = useState('Sellers');
  const [list, setList] = useState([]);

  useEffect(() => {
    getTopSellers()
          .then(({ data }) => setList(data))
  }, [])

  const seeAll = (type: string) => {
    switch (type) {
      case "Sellers":
        getTopSellers()
          .then(({ data }) => setList(data))

        break;
      case "Buyers":
        getTopBuyers()
          .then(({ data }) => setList(data))
        break;
      case "Collectors":
        getTopCollectors()
          .then(({ data }) => setList(data))

        break
      case "Artists":
        getTopArtists()
          .then(({ data }) => setList(data))

        break
      default:
    }

    setSubject(type);
  };
  return (
    <Layout headerVariant='full'>
      <Introduction numitems={list.length} seeAll={seeAll} subject={subject} />
      <UserList items={list} />
    </Layout>
  );
}
