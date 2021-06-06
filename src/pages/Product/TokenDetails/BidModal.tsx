import React, { useState, useEffect } from 'react';
import text from '../../../constants/content';
import { FormControl, InputLabel, Input } from '@material-ui/core';

import Button from 'components/button';
import Modal from 'components/widgets/Modal';
import useStyles from './Modals.style';

type BidModalProps = {
  onClose: () => void;
  onSubmit: () => void;
};

export default function BidModal({ onClose, onSubmit }: BidModalProps): JSX.Element {
  const classes = useStyles();

  const [numCopies, setNumCopies] = useState('1')
  const [userBalance, setUserBalance] = useState(22.237)
  const [serviceFee, setServiceFee] = useState(0.005)
  const [totalBidAmount, setTotalBidAmount] = useState(0.305)

  const [error, setError] = useState<string | null>(null);
  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'bid') {
      setError(Number(value) > userBalance ? 'Not enough funds' : null)
    }
  };

  const [info, setInfo] = useState({
      name: 'Invisible Doge | #0038 Weensy  Card Collection',
      creator: 'Weensy',
      copiesCount: 50
  })

  useEffect(() => {
      // get user's balance

      // get collectible info
  })

  return (
    <Modal open className={classes.modal} onClose={onClose}>
      <form className={classes.container}>
        <h2 className={classes.title}>{text['placeABid']}</h2>
        <div className={classes.intro}>
          <b>{text['youAreAboutToPlaceABidFor'] + 'Invisible Doge | #0038 Weensy  Card Collection'}</b>
        </div>
        <FormControl className={classes.fieldGroup}>
          <InputLabel shrink htmlFor='bid'>
            {text['yourBid']}
          </InputLabel>
          <Input id='bid' name='bid' placeholder='0.2' onChange={handleChange} />

          <div className={classes.inputHelpText}>ETH</div>
        </FormControl>

        <FormControl className={classes.fieldGroup}>
          <InputLabel shrink htmlFor='quantity'>
            {text['enterQuantity']}
            <small>({text['countAvailable'] + 24})</small>
          </InputLabel>
          <Input id='quantity' placeholder='1' onChange={(e) => setNumCopies(e.target.value)}/>
        </FormControl>
        <ul className={classes.additionalInfo}>
          <li>{text['yourBalance']} <b>{userBalance} ETH</b></li>
          <li>{text['serviceFee']} <b>0.005 ETH</b></li>
          <li>{text['totalBidAmount']}<b>0.205 ETH</b></li>
        </ul>
        <div className={classes.buttons}>
          <Button onClick={onSubmit} variantCustom='action' className={classes.buttonFilled} disabled={!!error}>{text['placeABid']}</Button>
          <Button variantCustom='outlined' className={classes.buttonOutlined} onClick={onClose}>{text['cancel']}</Button>
        </div>

        {error && <div className={classes.errorMessage}>{error}</div>}
      </form>
    </Modal>
  );
}
