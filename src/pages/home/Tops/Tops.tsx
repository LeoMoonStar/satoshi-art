import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/button';
import text from '../../../../public/content';
import Avatar from 'components/avatar';
import img from 'components/images/artist/avatar.jpg';
import top1 from 'components/images/home/tops1.png';
import top2 from 'components/images/home/tops2.png';
import top3 from 'components/images/home/tops3.png';

import useStyles from './Tops.style';

const top_collectors = [
  { id: 1, name: 'Fimbim', price: 1.124 },
  { id: 2, name: 'Fimbim', price: 1.124 },
  { id: 3, name: 'Fimbim', price: 1.124 },
];

const top_artists = [
  { id: 1, name: 'Fimbim', price: 1.124 },
  { id: 2, name: 'Fimbim', price: 1.124 },
  { id: 3, name: 'Fimbim', price: 1.124 },
];

const large_collections = [
  { id: 1, name: 'Fimbim', price: 1.124 },
  { id: 2, name: 'Fimbim', price: 1.124 },
  { id: 3, name: 'Fimbim', price: 1.124 },
];

export default function Tops(): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.col}>
          <small className={classes.subTitle}>{text['recentlyCollected']}</small>
          <h2 className={classes.title}>{text['topCollectors']}</h2>
          <img src={top1} alt='' className={classes.prevImage} />
          <div className={classes.users}>
            {top_collectors.map(({ id, name, price }) => {
              return (
                <Link to={`/artists/${id}`} className={classes.user} key={id}>
                  <Avatar image={img} status='premium' />
                  <div className={classes.info}>
                    <b className={classes.userName}>{name}</b>
                    <div className={classes.price}>{price}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to='/users' className={classes.seeAllLink}>
            <Button>{text['seeAll']}</Button>
          </Link>
        </div>
        <div className={classes.col}>
          <small className={classes.subTitle}>{text['recentSales']}</small>
          <h2 className={classes.title}>{text['topArtists']}</h2>
          <img src={top2} alt='' className={classes.prevImage} />
          <div className={classes.users}>
            {top_artists.map(({ id, name, price }) => {
              return (
                <Link to={`/artists/${id}`} className={classes.user} key={id}>
                  <Avatar image={img} status='premium' />
                  <div className={classes.info}>
                    <b className={classes.userName}>{name}</b>
                    <div className={classes.price}>{price}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to='/users' className={classes.seeAllLink}>
            <Button>{text['seeAll']}</Button>
          </Link>
        </div>
        <div className={classes.col}>
          <small className={classes.subTitle}>{text['artworksOwned']}</small>
          <h2 className={classes.title}>{text['largestCollections']}</h2>
          <img src={top3} alt='' className={classes.prevImage} />
          <div className={classes.users}>
            {large_collections.map(({ id, name, price }) => {
              return (
                <Link to={`/artists/${id}`} className={classes.user} key={id}>
                  <Avatar image={img} status='premium' />
                  <div className={classes.info}>
                    <b className={classes.userName}>{name}</b>
                    <div className={classes.price}>{price}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to='/users' className={classes.seeAllLink}>
            <Button>{text['seeAll']}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
