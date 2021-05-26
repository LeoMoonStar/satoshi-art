import React from 'react';
import { Modal, Typography, CircularProgress } from '@material-ui/core';
import { useCurrentNetwork } from 'hooks/useCurrentNetwork';
import useStyles from './WrongNetworkModal.style';
import text from '../../../../public/content';
//temporary modal for displaying wrong network
const WrongNetworkModal = (): JSX.Element => {
  const { accepted } = useCurrentNetwork();
  const classes = useStyles();
  return (
    <Modal open={!accepted}>
      <div className={classes.wrapper}>
        <div className={classes.modalContainer}>
          <CircularProgress color={'inherit'} />
          <Typography variant='h2'>{text['wrongNetwork']}</Typography>
          <Typography>{text['wrongNetworkMsg']}</Typography>
        </div>
      </div>
    </Modal>
  );
};

export default WrongNetworkModal;
