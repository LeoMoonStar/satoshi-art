import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getTopSellers, getTopBuyers, getTopCollectors, getTopArtists, getLargestCollections } from 'apis/users'

import Layout from 'components/layout';
import UserList from './UsersList';
import Introduction from './Introduction';

export default function Users() {
  const [subject, setSubject] = useState('Sellers');
  const [list, setList] = useState([]);
  const { type } = useParams<{ type: string }>()

  useEffect(() => {
    seeAll(type)
  }, [])

  const seeAll = (type: string) => {
    if (type.includes("Top")) {
      switch (type.replace("Top ", "")) {
        case "Sellers":
          getTopSellers()
            .then(({ data }) => {
              data.forEach(function (info: any) {
                const avatar = info.avatarUrl ? info.avatarUrl : '/default-avatar.jpeg'

                data['avatarUrl'] = avatar
              })

              setList(data)
            })

          break;
        case "Buyers":
          getTopBuyers()
            .then(({ data }) => {
              data.forEach(function (info: any) {
                const avatar = info.avatarUrl ? info.avatarUrl : '/default-avatar.jpeg'

                data['avatarUrl'] = avatar
              })

              setList(data)
            })
          break;
        case "Collectors":
          getTopCollectors()
            .then(({ data }) => {
              data.forEach(function (info: any) {
                const avatar = info.avatarUrl ? info.avatarUrl : '/default-avatar.jpeg'

                data['avatarUrl'] = avatar
              })

              setList(data)
            })

          break
        case "Artists":
          getTopArtists()
            .then(({ data }) => {
              data.forEach(function (info: any) {
                const avatar = info.avatarUrl ? info.avatarUrl : '/default-avatar.jpeg'

                data['avatarUrl'] = avatar
              })

              setList(data)
            })

          break
        default:
      }

      setSubject(type);
    } else {
      getLargestCollections()
        .then(({ data }) => {
            data.forEach(function (info: any) {
              const avatar = info.avatarUrl ? info.avatarUrl : '/default-avatar.jpeg'

              data['avatarUrl'] = avatar
            })

            setList(data)
          })

      setSubject("Largest Collections")
    }
  };
  return (
    <Layout headerVariant='full'>
      <Introduction numitems={list.length} seeAll={seeAll} subject={subject} />
      <UserList items={list} />
    </Layout>
  );
}
