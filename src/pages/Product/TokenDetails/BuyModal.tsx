import React from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import text from '../../../../public/content';
import Button from 'components/button';
import Modal from 'components/widgets/Modal';
import useStyles from './Modals.style';

type BidModalProps = {
  onClose: () => void;
  onSubmit: () => void;
};

export default function BuyModal({ onClose, onSubmit }: BidModalProps): JSX.Element {
  const classes = useStyles();

  return (
    <Modal open className={classes.modal} onClose={onClose}>
      <form className={classes.container}>
        <h2 className={classes.title}>{text['checkout']}</h2>
        <div className={classes.intro}>
          <b>{text['youAreAboutToPurchase'] + 'Invisible Doge | #0038 Weensy  Card Collection' + 'Weensy'}</b>
        </div>
        <FormControl className={classes.fieldGroup}>
          <InputLabel shrink htmlFor='quantity'>
            {text['enterQuantity']}
            <small>({text['countAvailable'] + 24})</small>
          </InputLabel>
          <Input id='quantity' placeholder='1' />
        </FormControl>
        <FormControl className={classes.priceRow}>
          <b>0.18531648913785145</b>
          <div className={classes.priceValueType}>ETH</div>
        </FormControl>
        <ul className={classes.additionalInfo}>
          <li>
            {text['yourBalance']} <b>0.237 ETH</b>
          </li>
          <li>
            {text['serviceFee']} <b>0.005 ETH</b>
          </li>
          <li>
            {text['totalBidAmount']}
            <b>0.205 ETH</b>
          </li>
        </ul>
        <div className={classes.buttons}>
          <Button onClick={onSubmit} variantCustom='action' className={classes.buttonFilled}>
            {text['proceedToPayment']}
          </Button>
          <Button variantCustom='outlined' className={classes.buttonOutlined} onClick={onClose}>
            {text['cancel']}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
