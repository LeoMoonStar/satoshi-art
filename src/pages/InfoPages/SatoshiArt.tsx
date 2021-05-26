import React from 'react';
import text from '../../../public/content';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Layout from 'components/layout';

import { LeftArrowIcon } from 'components/icons';

import useStyles from './InfoPages.style';

export default function SatoshiArt(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const handleGoBack = () => history.push('/');

  return (
    <Layout>
      <div className={classes.container}>
        <Button className={classes.backBtn} onClick={handleGoBack}>
          <LeftArrowIcon /> {text['backToHomePage']}
        </Button>
        <div className={classes.contentContainer}>
          <div>
            <h2>{text['s-art-intro1']}</h2>
            <p>{text['s-art-p1']}</p>
            <p>{text['s-art-p2']}</p>

            <h2>{text['s-art-intro2']}</h2>
            <p style={{ lineHeight: '1.85em' }}>{text['s-art-p3']}</p>

            <h2>{text['s-art-intro3']}</h2>
            <p>{text['s-art-p4']}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
