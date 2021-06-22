import React from 'react';
import { Modal as MUIModal, IconButton, Button } from '@material-ui/core';
import text from 'constants/content';

import { Close } from '@material-ui/icons';

import useStyles from './Popup.style';

type ModalProps = {
  open: boolean;
  textheader: string;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
};

const BidPopup: React.FC<ModalProps> = ({ open, textheader, onClose }) => {
  const classes = useStyles();
  const texts = textheader.split(";")

  return (
    <MUIModal open={open} onClose={onClose}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          
          <div className={classes.header}>{texts[0]}</div>

          {/* {texts.length == 3 && (
            <>
            {console.log(texts[1])}
              <div className={classes.divider} />
              <div className={classes.middleheader}>{texts[1]}</div>
            </>
          )} */}

          <div className={classes.bottomheader} >{texts[2]}</div>

          <div style={{textAlign:'center', marginTop:'10px'}}>

          <Button onClick={onClose}className={classes.buyButton}>Ok</Button>
          </div>
        </div>
      </div>
    </MUIModal>
  );
};

export default BidPopup;
