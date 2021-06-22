import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import {getDropOfTheDay} from "apis/users"
import useStyles from './DropOfTheDayArtist.style';
import DropOfTheDaySlider from '..//DropOfTheDaySlider';

type HistoryItemProps = {
  color: string;
  id: string;
  name: string;
  artistImage: string;
  imagePreview: string
};

export default function DropOfTheDayArtist({ color, id, name, artistImage, imagePreview }: HistoryItemProps): JSX.Element {
  const classes = useStyles();
  const [collectibles, setCollectibles]:any = React.useState([])
  
  React.useEffect(()=>{

    getDropOfTheDay().then(({ data }) => {

      const filter = data.filter((item:any)=>item.creatorUserId == id)
      console.log('filter data,',filter)
      console.log('name celebrity id',id)
      setCollectibles(filter.slice(0,4))
    });
  })
  return (
    <div className={classes.container}>
      <div className={classes.card} style={{ backgroundColor: color }}>
        <Link to={`/drop-of-the-day/${id}`} style={{ textDecoration: 'none' }}>
          <div className={classes.leftCol}>
            <h3 >{name}</h3>
            <img src={artistImage} />
          </div>
        </Link>
        <div className={cx(classes.rightCol, { [classes.whiteSliderDots]: color === '#C4C4C4' })}>
          <DropOfTheDaySlider name={collectibles} imagePreview={imagePreview} />
        </div>
      </div>
    </div>
  );
}
