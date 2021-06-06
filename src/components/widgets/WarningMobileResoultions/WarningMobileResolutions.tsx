import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import text from '../../../constants/content';

import useStyles from './WarningMobileResolutions.style';
import Modal from '../Modal';
import Button from '../../button';

export default function WarningMobileResolutions(): JSX.Element {
  const [isOpen, setOpen] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (window.innerWidth >= 1366 || sessionStorage.getItem('isConfirmedWarningMobileResolutions')) {
      return;
    }

    sessionStorage.setItem('isConfirmedWarningMobileResolutions', '1');
    setOpen(true);
  }, [history]);

  const classes = useStyles();

  return (
    <Modal className={classes.modal} onClose={() => setOpen(false)} open={isOpen}>
      <div className={classes.container}>
        <h2 className={classes.title}>{text['hello!']}</h2>
        <div className={classes.content}>{text['thisPageIsBestViewedWithDesktopDevices']}</div>
        <Button variantCustom='action' onClick={() => setOpen(false)} className={classes.buttonFilled}>
          {text['proceedAnyway']}
        </Button>
      </div>
    </Modal>
  );
}
