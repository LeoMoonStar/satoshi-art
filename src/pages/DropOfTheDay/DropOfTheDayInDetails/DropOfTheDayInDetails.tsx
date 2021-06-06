import React from 'react';
import text from '../../../constants/content';
import detail1 from 'components/images/dropOfTheDay/detail1.svg';
import detail2 from 'components/images/dropOfTheDay/detail2.svg';
import detail3 from 'components/images/dropOfTheDay/detail3.svg';

import useStyles from './DropOfTheDayInDetails.style';

export default function DropOfTheDayInDetails(): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div className={classes.row}>
        <div className={classes.iconWrap}>
          <img src={detail1} alt='' />
        </div>
        <div className={classes.info}>
          <h2 className={classes.title}>{text['auctionDetails']}</h2>
          <div className={classes.content}>{text['auctionDetailsContent']}</div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.iconWrap}>
          <img src={detail2} alt='' />
        </div>
        <div className={classes.info}>
          <h2 className={classes.title}>{text['howToBuy']}</h2>
          <div className={classes.content}>
            {text['howToBuyContent']}
            <br />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: text['howToBuyAdditionalContent'],
              }}
            />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.iconWrap}>
          <img src={detail3} alt='' />
        </div>
        <div className={classes.info}>
          <h2 className={classes.title}>{text['authenticVerification']}</h2>
          <div className={classes.content}>{text['authenticVerificationContent']}</div>
        </div>
      </div>
    </section>
  );
}
