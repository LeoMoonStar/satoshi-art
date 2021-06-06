import React from 'react';
import Pagination from 'components/widgets/Pagination';
import { useHistory } from 'react-router-dom'

import useStyles from './History.style';
import DropOfTheDayArtist from 'components/widgets/DropOfTheDayArtist';

type Item = {
    id: string,
    color: string,
    name: string,
    itemPreview: string,
    artistImage: string
}

export default function History({ items }: any): JSX.Element {
  const classes = useStyles();
  const history = useHistory();

  return (
    <section className={classes.container}>
      {items.map((item: any) => (
        <DropOfTheDayArtist
          key={item.id}
          id={item.id} color={item.color} name={item.name}
          artistImage={item.artistImage} imagePreview={item.itemPreview}
        />
      ))}

      <div className={classes.paginationWrapper}>
        <Pagination />
      </div>
    </section>
  );
}
