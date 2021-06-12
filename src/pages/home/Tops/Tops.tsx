import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/button';
import text from '../../../constants/content';
import Avatar from 'components/avatar';
import img from 'components/images/artist/avatar.jpg';
import top1 from 'components/images/home/tops1.png';
import top2 from 'components/images/home/tops2.png';
import top3 from 'components/images/home/tops3.png';
import { getTopCollectors, getTopArtists, getLargestCollections } from 'apis/users'

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
  const [topCollectors, setTopCollectors] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [largestCollections, setLargestCollections] = useState([])

  useEffect(() => {
    getTopCollectors()
      .then(({ data }) => setTopCollectors(data))

    getTopArtists()
      .then(({ data }) => setTopArtists(data))

    getLargestCollections()
      .then(({ data }) => setLargestCollections(data))
  }, [])

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.col}>
          <small className={classes.subTitle}>{text['recentlyCollected']}</small>
          <h2 className={classes.title} style={{marginTop: '12px'}} >{text['topCollectors']}</h2>

          <img src={top1} alt='' className={classes.prevImage} style={{marginTop: '27px'}}/>
          <div className={classes.users}>
            {topCollectors.map(({ isArtist, id, name }) => {
              return (
                <Link to={`/artists/${id}`} className={classes.user} key={id}>
                  <Avatar image={img} status={isArtist ? "premium" : ""} />
                  <div className={classes.info}>
                    <b className={classes.userName}>{name}</b>
                    {/*<div className={classes.price}>{price}</div>*/}
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to='/users/Top Collectors' className={classes.seeAllLink}>
            <Button>{text['seeAll']}</Button>
          </Link>
        </div>
        <div className={classes.col}>
          <small className={classes.subTitle}>{text['recentSales']}</small>
          <h2 className={classes.title}>{text['topArtists']}</h2>
          <img src={top2} alt='' className={classes.prevImage} />
          <div className={classes.users}>
            {topArtists.map(({ isArtist, id, name }) => {
              return (
                <Link to={`/artists/${id}`} className={classes.user} key={id}>
                  <Avatar image={img} status={isArtist ? "premium" : ""} />
                  <div className={classes.info}>
                    <b className={classes.userName}>{name}</b>
                    {/*<div className={classes.price}>{price}</div>*/}
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to='/users/Top Artists' className={classes.seeAllLink}>
            <Button>{text['seeAll']}</Button>
          </Link>
        </div>
        <div className={classes.col}>
          <small className={classes.subTitle}>{text['artworksOwned']}</small>
          <h2 className={classes.title}>{text['largestCollections']}</h2>
          <img src={top3} alt='' className={classes.prevImage} />
          <div className={classes.users}>
            {largestCollections.map(({ isArtist, id, name }) => {
              return (
                <Link to={`/artists/${id}`} className={classes.user} key={id}>
                  <Avatar image={img} status={isArtist ? "premium" : ""} />
                  <div className={classes.info}>
                    <b className={classes.userName}>{name}</b>
                    {/*<div className={classes.price}>{price}</div>*/}
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to='/users/Largest Collections' className={classes.seeAllLink}>
            <Button>{text['seeAll']}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
