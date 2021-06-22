import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import Button from 'components/button';
import card1 from 'components/images/dropOfTheDay/card1.png';
import card2 from 'components/images/dropOfTheDay/card2.png';
import card3 from 'components/images/dropOfTheDay/card3.png';
import card4 from 'components/images/dropOfTheDay/card4.png';
import useStyles from './DropOfTheDayWorkCards.style';
import { getDropOfTheDay } from 'apis/users';
import Works from 'components/widgets/Works';
import cx from 'clsx';
// import console from 'console';

type DropOfTheDayWorkCardsProp = {
  contentList?: any;
  userId:any;
}
export default function OrderListFilters({contentList, userId}: DropOfTheDayWorkCardsProp): JSX.Element {
  const classes = useStyles();
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    getDropOfTheDay().then(({ data }) => {
      const filter = data.filter((item:any)=>item.creatorUserId == userId)
      console.log('filter data,',filter)
      console.log('name celebrity id',userId)
      setCollectibles(filter.slice(0, 4))

    }
    );
  }, []);
  return (
    <section className={classes.container}>
      {collectibles.length > 0 ?

        collectibles.map(({ id, status, thumbnailUrl, name }) => (
          <div key={id} className={classes.card}>
            <img src={thumbnailUrl} alt={''} />
            {/* <div className={cx(classes.container)}>
              <img src={thumbnailUrl} alt={''} />
            </div> */}
            {/* <img
              src={thumbnailUrl}
              alt=''

              style={{maxWidth:'300px', maxHeight:'300px', }}
            />

            /> */}

            {console.log("in drop of the day work card", contentList)}
            <div className={classes.subTitle}>{name}</div>
              <div className={classes.content}>
                {/* <ul>{contentList.map((info: any, index: number) => <li key={index}>{info}</li>)}</ul> */}
              </div>
            {status == "onSale" && (
              <Link to={`/product/${id}`} style={{textDecoration:"none"}}>
                <Button className={classes.buyNow} fullWidth variantCustom='action'>
                  {text['buyNow']}
                </Button>
              </Link>
            )}
          </div>
        )) : <div style={{ fontSize: 20 }}>There are no drop of the day created</div>}

    </section>
  );
}
