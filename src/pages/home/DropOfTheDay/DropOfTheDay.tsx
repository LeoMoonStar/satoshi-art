import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import text from 'constants/content';

import colorsDissolvingImage from 'components/images/home/colorsDissolving.png';
import bradPitImage from 'components/images/home/bradPit.png';
import bradPitPaintImage from 'components/images/home/bradPitPaint.png';
import DropOfTheDaySlider from 'components/widgets/DropOfTheDaySlider';
import {getCelebrityList} from 'apis/dropoftheday'
import useStyles from './DropOfTheDay.styles';
import { DividerClassKey } from '@material-ui/core';
import { getDropOfTheDay } from 'apis/users';
export default function DropOfTheDay(): JSX.Element {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    name:'',
      celebrityId: "",
      avatarUrl: '',
      text: "",
      paintImage: '',
      colorCode:''
  })

  const [collectibles, setCollectibles]:any = useState([])
  useEffect(()=>{
    getCelebrityList().then(({data})=>{
      console.log("color code",data),
      setProfile({
        name:data.activeCelebrity.name,
        celebrityId:data.activeCelebrity.celebrityUserId,
        avatarUrl:data.activeCelebrity.homePageBarUrl,
        text:'',
        paintImage:'',
        colorCode:data.activeCelebrity.colorCode
      })
    })

    getDropOfTheDay().then(({ data }) => {

      const filter = data.filter((item:any)=>item.creatorUserId == profile.celebrityId)
      console.log('filter data,',filter)
      console.log('name celebrity id',profile.celebrityId)
      setCollectibles(filter.slice(0,4))
    });
  },[])
 
  return (
    <section className={classes.container}>
      <div className={classes.innerContainer}>
        <h2 className={classes.mainTitle}>{text['dropOfTheDay']}</h2>
        <div className={classes.card} style={{backgroundColor:`#${profile.colorCode}`}}>
          <div onClick={()=>location.replace(`/drop-of-the-day/${profile.celebrityId}`)}>
            <div className={classes.leftCol} >
              <h3>{profile.name}</h3>
              <img src={profile.avatarUrl} />
            </div>
          </div>
          <div className={classes.rightCol}>
            <DropOfTheDaySlider name={collectibles} imagePreview={profile.paintImage}/>
           
          </div>
        </div>
      </div>
      <img className={classes.colorsDissolving} src={colorsDissolvingImage} />
    </section>
  );
}
