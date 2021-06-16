import React from 'react';
//import Pagination from 'components/widgets/Pagination';

import history1 from 'components/images/dropOfTheDay/history1.jpg';
import brunoMars from 'components/images/dropOfTheDay/brunoMars.png';
import useStyles from './UsersList.style';
import Avatar from 'components/avatar';
import { Link } from 'react-router-dom';

const UserItem = ({ name, item }: any): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <div className={classes.itemIntro} style={{ backgroundImage: `url(${item.coverUrl})` }} />
      <div className={classes.itemInfo}>
        <Avatar size={60} image={item.avatarUrl} className={classes.itemAvatar} onClick={()=>{item.isArtist ? location.href =`/artists/${item.id}` : location.href =`/users/${item.id}`}} />
        {/*<h3 className={classes.itemTitle}>Fresh Meat #F</h3>*/}
        <div className={classes.itemAdditionalInfo}>
          <Link to={item.isArtist ? `/artists/${item.id}` : `/users/${item.id}` }>@{name} </Link>
        </div>
      </div>
    </div>
  );
};

export default function UsersList({ items }: any): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div className={classes.cardsWrapper}>
        {items.map((item: any, index: any) => (
          <UserItem key={index} name={item.name} item={item}/>
        ))}
      </div>
      {/*<div className={classes.paginationWrapper}>
        <Pagination className={classes.pagination} />
      </div>*/}
    </section>
  );
}
