import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import text from '../../../constants/content';
import Button from 'components/button';
import { getCollectible } from 'apis/collectibles';
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
  const [userBalance, setUserBalance] = useState(0.237);
  const [serviceFee, setServiceFee] = useState(2.5);
  const [totalBidAmount, setTotalBidAmount] = useState(0.205);
  const { id } = useParams<{ id: string }>();
  const [info, setInfo] = useState({
    name: '',
    creator: '',
    copiesCount: 0,
    price: 0,
    numberOfCopy:0
  });

  //getCollectible by id gives me price,copies,
  useEffect(() => {
    // get user's balance
    const init = async () => {
      const { data } = await getCollectible(id);
      const metamaskId: any = data;
      console.log('buy modal', metamaskId);
      setInfo({
        name: metamaskId.name,
        creator: metamaskId.creatorUserId,
        copiesCount: metamaskId.totalCopies,
        price: metamaskId.price,
        numberOfCopy:metamaskId.numberOfCopy
      });

    };
    init();
    // get collectible info
  }, []);

  return (
    <Modal open className={classes.modal} onClose={onClose}>
      <form className={classes.container}>
        <h2 className={classes.title}>{text['checkout']}</h2>
        <div className={classes.intro}>
          <b>
            {text['youAreAboutToPurchase']} {info.name} {info.creator}
          </b>
        </div>
        <FormControl className={classes.fieldGroup}>
          <InputLabel shrink htmlFor='quantity'>
            {text['enterQuantity']}
            <small>
              ({info.numberOfCopy +1 } of {info.copiesCount})
            </small>
          </InputLabel>
          <Input id='quantity' placeholder='1' onChange={e => setCopies(e.target.value)} value={numCopies} />
        </FormControl>
        <FormControl className={classes.priceRow}>
          <b>{info.price}</b>
          <div className={classes.priceValueType}>ETH</div>
        </FormControl>
        <ul className={classes.additionalInfo}>
          <li>
            {text['yourBalance']} <b>{userBalance} ETH</b>
          </li>
          <li>
            {text['serviceFee']} <b>{((serviceFee * info.price )/100).toFixed(6)} ETH</b>
          </li>
          <li>
            {text['totalBidAmount']}
            <b>{totalBidAmount} ETH</b>
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
