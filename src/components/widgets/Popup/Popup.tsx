import React from 'react';
import { Modal as MUIModal, IconButton } from '@material-ui/core';
import text from '../../../constants/content';

import { Close } from '@material-ui/icons';

import useStyles from './Popup.style';

type ModalProps = {
  open: boolean;
  textheader: string;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
};

const Popup: React.FC<ModalProps> = ({ open, textheader, onClose }) => {
  const classes = useStyles();
  const texts = textheader.split(";")

  return (
    <MUIModal open={open} onClose={onClose}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.close} onClick={onClose}>x</div>
          <div className={classes.header}>{texts[0]}</div>

          {texts.length == 3 && (
            <>
              <div className={classes.divider} />
              <div className={classes.middleheader}>{texts[1]}</div>
            </>
          )}

          <div className={classes.bottomheader}>{texts[2]}</div>
        </div>
      </div>
    </MUIModal>
  );
};

export default Popup;
