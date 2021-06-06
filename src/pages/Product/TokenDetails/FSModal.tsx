import React from 'react';
import { IconButton, Modal } from '@material-ui/core';
import { ExpandIcon } from 'components/icons';
import text from '../../../constants/content';
import useStyles from './Modals.style';

type FullScreenModalProps = {
  onClose: () => void;
  src: string;
};

export default function FullScreenModal({ onClose, src }: FullScreenModalProps): JSX.Element {
  const classes = useStyles();

  return (
    <Modal open className={classes.fsModal} onClose={onClose}>
      <div className={classes.fsModalContainer}>
        <div className={classes.fsModalHeader}>
          <IconButton title={text['close']} onClick={onClose}>
            <ExpandIcon />
          </IconButton>
        </div>
        <div className={classes.collectibleWrapper}>
          <div className={classes.collectibleItem}>
            <img src={src} alt={'Token image'} />
          </div>
        </div>
        {/* TODO: must be replaced with real data */}
        <div className={classes.fsModalFooter}>
          <div>JOEL THE SKATER CAT</div>
          <div>
            <span>by</span> <a href='#'>Author</a> <span>on</span> <a href='#'>Site</a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
