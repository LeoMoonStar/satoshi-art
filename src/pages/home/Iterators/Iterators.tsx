import React from 'react';
import { Link } from 'react-router-dom';
import text from '../../../../public/content';
import Button from 'components/button';
import iterator1 from 'components/images/home/iterator1.png';
import iterator2 from 'components/images/home/iterator2.png';
import iterator3 from 'components/images/home/iterator3.png';

import useStyles from './Iterators.style';

const items = [
  { id: 1, img: iterator1, name: 'Rihanna' },
  { id: 2, img: iterator2, name: 'Bruno Mars' },
  { id: 3, img: iterator3, name: 'Ryan Reynolds' },
];

export default function Iterators(): JSX.Element {
  const classes = useStyles();

  return (
    <section>
      <div className={classes.container}>
        <h2 className={classes.mainTitle}>{text['previousWeeklyIterations']}</h2>

        {items.map(({ id, img, name }) => {
          return (
            <Link to={`/drop-of-the-day-history`} key={id} style={{ textDecoration: 'none' }}>
              <div key={id} className={classes.card}>
                <img className={classes.image} src={img} alt='.' />
                <h3 className={classes.name}>{name}</h3>
              </div>
            </Link>
          );
        })}

        <div className={classes.buttonRow}>
          <Link to='/drop-of-the-day-history' style={{ textDecoration: 'none' }}>
            <Button variantCustom='action'>{text['seeAllHistory']}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
