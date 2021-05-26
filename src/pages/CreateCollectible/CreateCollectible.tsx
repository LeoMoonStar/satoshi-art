import React from 'react';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import Layout from 'components/layout';
import { LeftArrowIcon } from 'components/icons';

import useStyles from './CreateCollectible.style';
import CreateForm from './CreateForm';

const CreateCollectible = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory<{ isAllowedGoBack: boolean }>();

  const handleGoBack = () => {
    if (history.location.state?.isAllowedGoBack) {
      history.back();
      return;
    }

    history.push('/create-collectible');
  };
  const isSingle = false;

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          <Button onClick={handleGoBack} className={classes.goBack}>
            <LeftArrowIcon /> Go Back
          </Button>
          <div className={classes.title}>Create collectible</div>
        </div>
        <CreateForm isSingle={isSingle} />
      </div>
    </Layout>
  );
};

export default CreateCollectible;
