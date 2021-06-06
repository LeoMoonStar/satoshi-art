import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import useStyles from './LaunchTime.style';

const getTimeDurationInCharsToTargetTime = (date: Date) => {
  let timeDiff = date.getTime() - new Date().getTime();

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
    content: string,
    nextActionDate: string
}

export default function LaunchTime({ content, nextActionDate }: LaunchTimeProp): JSX.Element {
  const classes = useStyles();
  const targetTime = '2021-04-06';

  const [time, setTimer] = useState(getTimeDurationInCharsToTargetTime(new Date(targetTime)));

  useEffect(() => {
    setInterval(() => setTimer(getTimeDurationInCharsToTargetTime(new Date(targetTime))), 1000);
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
      <div className={classes.additionalInfo}>
        {text['theNextActionWillBeAvailableOn']} 
        <Link to='/'>{nextActionDate}</Link>.
      </div>
    </section>
  );
}
