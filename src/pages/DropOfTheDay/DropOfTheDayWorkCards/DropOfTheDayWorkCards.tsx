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
// import console from 'console';

export default function OrderListFilters(): JSX.Element {
  const classes = useStyles();
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    getDropOfTheDay().then(({ data }) => 

    setCollectibles(data));
  }, []);

  return (
    <section className={classes.container}>
      
      {/* {console.log(collectibles[1,4])} */}
      {collectibles.length > 0 ? 
          
          collectibles.map(({ id, status, thumbnailUrl, name }) => (
        <div key={id} className={classes.card}>
          {/* <img 
            src={!thumbnailUrl.includes('s3.thumbnailurl') ? thumbnailUrl : '/collectible-image.jpeg'} 
            alt='' 
          /> */}
          <img 
            src={thumbnailUrl} 
            alt='' 
          />
          
          {/* <div className={classes.header}>
            <h2 className={classes.title}></h2> 
            <div className={classes.count}>{text['countOfCount'] + 2 + 10}</div>
          </div> */}
          <div className={classes.subTitle}>{name}</div>
          {/* <ul className={classes.list}>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Etiam iaculis nulla eu sodales sagittis</li>
            <li>Felis pellentesque nibh, in varius ipsum orci et</li>
            <li>Aliquam posuere purus mi, vitae luctus justo</li>
            <li>Nulla pulvinar sed nisl</li>
          </ul> */}
          {status == "onSale" && (
            <Link to={`/product/${id}`}>
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
