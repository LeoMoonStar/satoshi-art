import React from 'react';
import text from '../../../constants/content';
import bradImage from 'components/images/dropOfTheDay/bradPit.png';

import useStyles from './Introduction.style';

type Intro = {
    name: string
    content: string
    avatar: string
}

export default function TheSeries({ name, content, avatar }: Intro): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <article className={classes.article}>
        <h2 className={classes.title}></h2>
        <div className={classes.content}>{content}</div>
        <div className={classes.pageTitle}>{text['dropOfTheDay']}</div>
      </article>
      <img className={classes.artistImage} src={avatar} alt="" />
    </section>
  );
}
