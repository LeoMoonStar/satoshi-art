import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Input } from '@material-ui/core';
import text from '../../../constants/content';
import Button from 'components/button';
import Modal from 'components/widgets/Modal';
import useStyles from './Modals.style';

type BidModalProps = {
  setCopies: (numcopies: string) => void;
  numCopies: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function BuyModal({ setCopies, numCopies, onClose, onSubmit }: BidModalProps): JSX.Element {
  const classes = useStyles();
  const [userBalance, setUserBalance] = useState(0.237)
  const [serviceFee, setServiceFee] = useState(0.005)
  const [totalBidAmount, setTotalBidAmount] = useState(0.205)
  const [info, setInfo] = useState({
      name: 'Invisible Doge | #0038 Weensy  Card Colledfction',
      creator: 'Weense',
      copiesCount: 50,
      price: 0.18531648913785145,
  })

  useEffect(() => {
      // get user's balance

      // get collectible info
  }, [])

  return (
    <Modal open className={classes.modal} onClose={onClose}>
      <form className={classes.container}>
        <h2 className={classes.title}>{text['checkout']}</h2>
        <div className={classes.intro}>
          <b>{text['youAreAboutToPurchase']} {info.name} {info.creator}</b>
        </div>
        <FormControl className={classes.fieldGroup}>
          <InputLabel shrink htmlFor='quantity'>
            {text['enterQuantity']}
            <small>({text['countAvailable']} {info.copiesCount})</small>
          </InputLabel>
          <Input id='quantity' placeholder='1' onChange={(e) => setCopies(e.target.value)} value={numCopies}/>
        </FormControl>
        <FormControl className={classes.priceRow}>
          <b>{info.price}</b>
          <div className={classes.priceValueType}>ETH</div>
        </FormControl>
        <ul className={classes.additionalInfo}>
          <li>{text['yourBalance']} <b>{userBalance} ETH</b></li>
          <li>{text['serviceFee']} <b>{serviceFee} ETH</b></li>
          <li>{text['totalBidAmount']}<b>{totalBidAmount} ETH</b></li>
        </ul>
        <div className={classes.buttons}>
          <Button onClick={onSubmit} variantCustom='action' className={classes.buttonFilled}>{text['proceedToPayment']}</Button>
          <Button variantCustom='outlined' className={classes.buttonOutlined} onClick={onClose}>{text['cancel']}</Button>
        </div>
      </form>
    </Modal>
  );
}
