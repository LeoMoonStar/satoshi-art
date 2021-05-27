import React from 'react';
import { Link } from 'react-router-dom';
import text from '../../../../constants/content';
import Button from 'components/button';
import Avatar from 'components/avatar';
import bradPit from 'components/images/home/bradPitPaint.png';

import useStyles from './TopList.style';

//todo: must be deleted after integration with api
const items = [
  { id: 1, metamaskid: '0x194ec3a371463639fd917245405ea3357ff16d36', name: 'Dada', currency: 124.563 },
  { id: 2, metamaskid: '0x244af495b432dcd987d73441fc05892a8fe7593c', name: 'Kevin', currency: 121.563 },
];

type TopListProps = {
  titleColor: string;
  title: string;
};

export default function TopList({ titleColor, title }: TopListProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.group}>
      <div className={classes.groupWrapper}>
        <h2 className={classes.mainTitle} style={{ color: titleColor }}>
          {title}
        </h2>
        <div className={classes.groupItems}>
          {items.map(({ id, metamaskid, name, currency }) => {
            return (
              <Link to={`/artists/${metamaskid}`} key={id} className={classes.topsItem}>
                <div className={classes.index}>{id}</div>

                <Avatar size={48} image={bradPit} status='premium' />

                <div className={classes.info}>
                  <b className={classes.userName}>{name}</b>
                  <div className={classes.currency}>{currency}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to='/users'>
          <Button className={classes.seeAll}>{text['seeAll']}</Button>
        </Link>
      </div>
    </div>
  );
}
