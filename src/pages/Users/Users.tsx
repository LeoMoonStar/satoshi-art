import React, { useState } from 'react';

import Layout from 'components/layout';
import UserList from './UsersList';
import Introduction from './Introduction';

const items = [
  { id: 1, name: 'Fimbim', currency: 124.563 },
  { id: 2, name: 'dfdf', currency: 121.563 },
  { id: 3, name: 'Fimbim', currency: 12.563 },
  { id: 4, name: 'Redlioneye', currency: 1.563 },
  { id: 5, name: 'Fimbim', currency: 0.563 },
  { id: 6, name: 'Fimbim', currency: 124.563 },
  { id: 7, name: 'Redlioneye', currency: 121.563 },
  { id: 8, name: 'Fimbim', currency: 12.563 },
  { id: 9, name: 'Redlioneye', currency: 1.563 },
  { id: 10, name: 'Fimbim', currency: 0.563 },
];

export default function Users() {
  const [subject, setSubject] = useState('Sellers');
  const [list, setList] = useState(items);

  const seeAll = (type: string) => {
    const newList = list.reverse();

    setSubject(type);
    setList(newList);
  };
  return (
    <Layout headerVariant='full'>
      <Introduction seeAll={seeAll} subject={subject} />
      <UserList items={list} />
    </Layout>
  );
}
