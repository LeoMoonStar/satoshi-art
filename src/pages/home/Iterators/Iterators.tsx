import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import Button from 'components/button';
import iterator1 from 'components/images/home/iterator1.png';
import iterator2 from 'components/images/home/iterator2.png';
import iterator3 from 'components/images/home/iterator3.png';
import { getCelebrityList } from 'apis/dropoftheday';
import { getUserInfo } from 'apis/users';
import useStyles from './Iterators.style';

export default function Iterators(): JSX.Element {
  const classes = useStyles();
  const [profile, setProfile]: any = useState([]);


  useEffect(() => {
    const previous: any = [...profile];

    const allHistoryCelebrity:any = []

    getCelebrityList().then(({ data }) => {
      console.log(data)
      setProfile(data.previousCelebrities);
      
    });
  }, []);



  return (
    <section>
      <div className={classes.container}>
        <h2 className={classes.mainTitle}>{text['previousWeeklyIterations']}</h2>

        {profile.map((item: any, index: string | number) => {
          console.log("!!!!!!!??????????//////",item);
          return (
            <Link to={`/drop-of-the-day-history`} key={item.celebrityId} style={{ textDecoration: 'none' }}>
              <div key={item.celebrityId} className={classes.card}>
                <img className={classes.image} src={item.homePageAvatarUrl} alt='.' />
                <h3 className={classes.name}>{item.name}</h3>
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
