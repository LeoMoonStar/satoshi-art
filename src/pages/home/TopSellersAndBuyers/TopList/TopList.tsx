import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import text from '../../../../constants/content';
import Button from 'components/button';
import Avatar from 'components/avatar';
import bradPit from 'components/images/home/bradPitPaint.png';
import { getTopSellers, getTopBuyers } from 'apis/users'

import useStyles from './TopList.style';

type TopListProps = {
  titleColor: string;
  title: string;
};

export default function TopList({ titleColor, title }: TopListProps): JSX.Element {
  const classes = useStyles();
  const [topList, setTopList] = useState([])

  useEffect(() => {
        switch (title) {
            case "Top Sellers":
                // fetching top sellers here
                getTopSellers()
                    .then((res) => setTopList(res.data))


                break
            case "Top Buyers":
                // fetching top buyers here
                getTopBuyers()
                    .then((res) => setTopList(res.data))

                break
        }
    }, [])

  return (
    <div className={classes.group}>
      <div className={classes.groupWrapper}>
        <h2 className={classes.mainTitle} style={{ color: titleColor }}>{title}</h2>
        <div className={classes.groupItems}>
            {topList.length > 0 ? 
              topList.map(({ isArtist, id, name, avatarUrl, currency }, index) => {
                return (
                  <Link to={isArtist ? `/artists/${id}` : `/users/${id}`} key={index} className={classes.topsItem}>
                    <div className={classes.index}>{index + 1}</div>

                    <Avatar size={48} image={avatarUrl} status='premium' />

                    <div className={classes.info}>
                      <b className={classes.userName}>{name}</b>
                      <div className={classes.currency}>{currency}</div>
                    </div>
                  </Link>
                );
              })
              :
              <div className={classes.noResult}>No {title.toLowerCase()}</div>
            }
        </div>
        <Link to='/users'>
          <Button className={classes.seeAll}>{text['seeAll']}</Button>
        </Link>
      </div>
    </div>
  );
}
