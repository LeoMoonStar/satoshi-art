import React from 'react';
import { Button } from '@material-ui/core';
import text from '../../../public/content.js';
import { useHistory } from 'react-router-dom';

import { LeftArrowIcon } from 'components/icons';

import Layout from 'components/layout';
import EditForm from './EditForm';
import useStyles from './EditProfile.style';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const handleGoBack = () => history.back(); // might be goBack or back

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          <Button className={classes.goBack} onClick={handleGoBack}>
            <LeftArrowIcon /> {text['goBack']}
          </Button>
          <h1 className={classes.title}>{text['editProfile']}</h1>
        </div>
        <EditForm />
      </div>
    </Layout>
  );
}
