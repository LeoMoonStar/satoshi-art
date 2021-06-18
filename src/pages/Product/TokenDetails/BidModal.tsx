import React, { useState, useEffect } from 'react';
import text from '../../../constants/content';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Button from 'components/button';
import Modal from 'components/widgets/Modal';
import { getCollectible } from 'apis/collectibles';
import web3Contract from 'abis/web3contract';

import useStyles from './Modals.style';

type BidModalProps = {

  onClose: () => void;
  onSubmit: (bid:any) => any;
};

export default function BidModal({ onClose, onSubmit }: BidModalProps): JSX.Element {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [numCopies, setNumCopies] = useState('1')
  const [userBalance, setUserBalance] = useState('')
  const [serviceFee, setServiceFee] = useState(0.005)
  const [totalBidAmount, setTotalBidAmount] = useState(0.305)
  const[bid, setBid] = useState(0);
  const[listingBid, setListingBid] = useState('');

  const [error, setError] = useState<string | null>(null);
  const handleChange = async ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'bid') {
      
      
      try {
       
          setError((Number(value) > Number(userBalance) )? 'Not enough funds' : null)
          //setError((Number(value) > Number(listingBid) )? 'Bid Should be higher than highest bid amount' : null)
          setBid(Number(value));
        }
         
        
       catch (error) {
        console.log(error.message)
      }
      
    }
  };

  const [info, setInfo] = useState({
      name: '',
      creator: '',
      copiesCount: 0,
      numberOfCopy:0,
      tokenId:'',
      ownerMetamaskId:''
  })

  useEffect(() => {
    //
    const init = async () => {

    //get user balance
    const metamaskAddr = await web3Contract.requestMetamaskAccess();
    const balance = await web3Contract.userBalance(metamaskAddr[0])
    setUserBalance(balance)
      const { data } = await getCollectible(id);
      const metamaskId: any = data;
      console.log('bid modal', metamaskId);
      setInfo({
        name: metamaskId.name,
        creator: metamaskId.creatorUserId,
        copiesCount: metamaskId.totalCopies,
        numberOfCopy:metamaskId.numberOfCopy,
        tokenId: metamaskAddr.tokenId,
        ownerMetamaskId:metamaskAddr.ownerMetamaskId
      });

      // web3Contract.checkCollectibleStatus(info.ownerMetamaskId, info.tokenId).then(res=>{
      //   setListingBid(res[7])
      // })

    };
    init();
    // get collectible info
  }, []);

  return (
    <Modal open className={classes.modal} onClose={onClose}>
      <form className={classes.container}>
        <h2 className={classes.title}>{text['placeABid']}</h2>
        <div className={classes.intro}>
          <b>{text['youAreAboutToPlaceABidFor'] + ' ' + info.name}</b>
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
            <small>({ info.numberOfCopy+1 + ' ' +text['countAvailable'] +' of ' + info.copiesCount} )</small>
          </InputLabel>
          <Input id='quantity' placeholder='1' value={numCopies}onChange={(e) => setNumCopies(e.target.value)}/>
        </FormControl>
        <ul className={classes.additionalInfo}>
          <li>{text['yourBalance']} <b>{userBalance} ETH</b></li>
          <li>{text['serviceFee']} <b>{(Number(userBalance) *25)/1000} ETH</b></li> 
          <li>{text['totalBidAmount']}<b>0.205 ETH</b></li>
        </ul>
        <div className={classes.buttons}>
          <Button onClick={() => onSubmit(bid)} variantCustom='action' className={classes.buttonFilled} disabled={!!error}>{text['placeABid']}</Button>
          <Button variantCustom='outlined' className={classes.buttonOutlined} onClick={onClose}>{text['cancel']}</Button>
        </div>

        {error && <div className={classes.errorMessage}>{error}</div>}
      </form>
    </Modal>
  );
}
