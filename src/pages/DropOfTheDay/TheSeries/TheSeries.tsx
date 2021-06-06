import React from 'react';

import DropOfTheDaySlider from 'components/widgets/DropOfTheDaySlider';
import useStyles from './TheSeries.style';

type TheSeriesProp = {
    content: string,
    sliderPreview: string
}

export default function TheSeries({ content, sliderPreview }: TheSeriesProp): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div className={classes.leftCol}>
        <h2 className={classes.mainTitle}>The series</h2>
        <div className={classes.content}>{content}</div>
      </div>
      <div className={classes.rightCol}>
        {/*<DropOfTheDaySlider id="1" name="Fresh meat #A" imagePreview={sliderPreview} className={classes.slider} />*/}
      </div>
    </section>
  );
}
