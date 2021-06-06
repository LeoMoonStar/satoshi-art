import React from 'react';
import { Button } from '@material-ui/core';
import text from '../../constants/content';
import { NavLink, useHistory } from 'react-router-dom';

import { LeftArrowIcon } from 'components/icons';
import multipleCollectible from 'components/images/multipleCollectible.svg';

import Layout from 'components/layout';
import useStyles from './CreateCollectibleType.style';

export default function CreateCollectibleType(): JSX.Element {
  const classes = useStyles();

  const history = useHistory<{ isAllowedGoBack: boolean }>();

  const handleGoBack = () => history.goBack();
  const isAllowedGoBack = history.location.state?.isAllowedGoBack;

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.contentCard}>
          {isAllowedGoBack && (
            <Button className={classes.goBack} onClick={handleGoBack}>
              <LeftArrowIcon /> {text['goBack']}
            </Button>
          )}
          <h1 className={classes.title}>{text['createCollectible']}</h1>

          <div className={classes.content}>{text['chooseSingleIfYouWantYourCollectible']}</div>

          <div className={classes.additionalInfo}>{text['createCollectibleAdditionalInfo']}</div>
        </div>
        <div className={classes.cards}>
          <NavLink
            to={{
              pathname: '/create-collectible/multiple',
              state: { isAllowedGoBack: true },
            }}
          >
            <button type='button' className={classes.card}>
              <img src={multipleCollectible} alt='' />
              <h3 className={classes.cardTitle}>{text['multiple']}</h3>
            </button>
          </NavLink>
        </div>
      </div>
    </Layout>
  );
}
