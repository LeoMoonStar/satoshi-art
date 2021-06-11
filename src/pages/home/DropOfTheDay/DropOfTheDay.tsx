import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import text from 'constants/content';

import colorsDissolvingImage from 'components/images/home/colorsDissolving.png';
import bradPitImage from 'components/images/home/bradPit.png';
import bradPitPaintImage from 'components/images/home/bradPitPaint.png';
import DropOfTheDaySlider from 'components/widgets/DropOfTheDaySlider';
import {getCelebrityList} from 'apis/dropoftheday'
import useStyles from './DropOfTheDay.styles';

export default function DropOfTheDay(): JSX.Element {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    name:'',
      celebrityId: "",
      avatarUrl: '',
      text: "",
      paintImage: ''
  })

  useEffect(()=>{
    getCelebrityList().then(({data})=>{
      setProfile({
        name:data.activeCelebrity.name,
        celebrityId:data.activeCelebrity.celebrityUserId,
        avatarUrl:data.activeCelebrity.homePageBarUrl,
        text:'',
        paintImage:''
      })
    })
  },[])
 
  return (
    <section className={classes.container}>
      <div className={classes.innerContainer}>
        <h2 className={classes.mainTitle}>{text['dropOfTheDay']}</h2>
        <div className={classes.card}>
          <Link to={`/drop-of-the-day/${profile.celebrityId}`}>
            <div className={classes.leftCol} >
              <h3>{profile.name}</h3>
              <img src={profile.avatarUrl} />
            </div>
          </Link>
          <div className={classes.rightCol}>
            <DropOfTheDaySlider name={profile.text} imagePreview={profile.paintImage}/>
          </div>
        </div>
      </div>
      <img className={classes.colorsDissolving} src={colorsDissolvingImage} />
    </section>
  );
}
