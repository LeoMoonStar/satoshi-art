import { AnyAaaaRecord } from 'dns';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import useStyles from './LaunchTime.style';
import web3Contract from 'abis/web3contract';
import moment from 'moment';
const getTimeDurationInCharsToTargetTime = (date: any) => {
  //alert(date)
  const currentTime = Math.floor(new Date().getTime());

  // console.log('data',date)
  //console.log('currentTime', currentTime)

  let timeDiff = moment(date).diff(moment(currentTime));
  //console.log('time left',timeDiff)
  if (timeDiff < 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }

  const days = Math.floor(timeDiff / 86400000);
  timeDiff -= days * 86400000;

  const hours = Math.floor(timeDiff / 3600000);
  timeDiff -= hours * 3600000;

  const minutes = Math.floor(timeDiff / 60000);
  timeDiff -= minutes * 60000;

  const seconds = Math.floor(timeDiff / 1000);

  const toTimeString = (val: number): string => (val < 10 ? `0${val}` : `${val}`);

  return {
    days: toTimeString(days),
    hours: toTimeString(hours),
    minutes: toTimeString(minutes),
    seconds: toTimeString(seconds),
  };
};

type LaunchTimeProp = {
  content: string;
  nextActionDate: string;
  tokenId: any;
  ownerMetamaskId: any;
  endTime:any;
  startTime:any;
};

export default function LaunchTime({ content, nextActionDate, startTime,endTime,tokenId, ownerMetamaskId }: LaunchTimeProp): JSX.Element {
  const classes = useStyles();
  const targetTime = '2021-06-23';
  console.log(startTime)
  //const [startTime, setStartTime]: any = useState(0);
  //const [endTime, setEndTime]: any = useState(0);

  // useEffect(() => {
  //   const init = async () => {
  //     console.log(ownerMetamaskId);
  //     web3Contract
  //       .checkCollectibleStatus(ownerMetamaskId, tokenId)
  //       .then((res: any) => {
  //         console.log(res[2].toNumber());
  //         const time = res[2].toNumber();
  //         setStartTime(time * 1000);
  //       })
  //       .catch(err => console.log(err.message));
  //   };
  //   init();
  // }, []);

  const [time, setTimer] = useState(getTimeDurationInCharsToTargetTime(startTime));

  useEffect(() => {
    setInterval(() => setTimer(getTimeDurationInCharsToTargetTime(startTime)), 1000);
  }, []);

  return (
    <section className={classes.container}>
      <h2 className={classes.mainTitle}>{text['launchTime']}</h2>
      <div className={classes.info}>{content}</div>
      <div className={classes.timer}>
        <div className={classes.col}>
          <b>{time.days}</b>
          <span>{text['days']}</span>
        </div>
        <div className={classes.col}>
          <b>{time.hours}</b>
          <span>{text['hours']}</span>
        </div>
        <div className={classes.col}>
          <b>{time.minutes}</b>
          <span>{text['minutes']}</span>
        </div>
        <div className={classes.col}>
          <b>{time.seconds}</b>
          <span>{text['seconds']}</span>
        </div>
      </div>
      {/* <div className={classes.additionalInfo}>
        {text['theNextActionWillBeAvailableOn']} 
        <Link to='/'>{nextActionDate}</Link>.
      </div> */}
    </section>
  );
}
