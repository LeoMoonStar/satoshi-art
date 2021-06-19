import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  styled,
  Grid,
  FormControl,
  FormHelperText,
  Input,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  Theme,

} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
// import {AdapterDateFns} from '@material-ui/lab/';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import DateTimePicker from '@material-ui/lab/DateTimePicker';

import text from 'constants/content';
import { Modal as MUIModal } from '@material-ui/core';

import { ExpandIcon, GreySaveIcon, ViewsIcon, LikeIcon, SaveIcon, DotsIcon, LeftArrowIcon } from 'components/icons';
import { VALID_VIDEO_TYPES, VALID_AUDIO_TYPES } from 'constants/supportedFileTypes';
import { getCollectible, putCollectibleOnSale, removeCollectibleFromSale, putOnAuction, bidCollectible } from 'apis/collectibles';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from 'components/layout';
import Button from 'components/button';
import Avatar from 'components/avatar';
import Popup from 'components/widgets/Popup';
import web3 from 'web3';
import web3Contract from '../../abis/web3contract';

const IconWrapper = styled(Grid)(({ dots, theme }: { dots?: boolean; theme: Theme }) => ({
  width: dots ? 82 : 40,
  height: 40,
  marginRight: dots ? 0 : 13,
  backgroundColor: `${theme.custom.common.blackColor}80`,
  borderRadius: 20,
  display: 'flex',
}));

import useStyles from './EditCollectible.style';
import { InfoRounded } from '@material-ui/icons';
import { time } from 'console';
import { current } from 'immer';

const COLLECTION_OPTIONS = ['onSale'];

export default function EditCollectible() {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  console.log("before useeffect:", id)

  const [info, setInfo] = useState({
    status: '',
    thumbnailUrl: '',
    name: '',
    price: 0,
    tokenId: '',
    collectibleId: '',
    metamaskId: '',
  });
  const [priceError, setPriceError] = useState(false);
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [checked, setChecked] = React.useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkBidding, setCheckBidding] = React.useState(false);
  const [showSaleError, setShowSaleError] = React.useState(false);

  const address0 = '0x0000000000000000000000000000000000000000';
  const ONSALE = '0x01';
  const ONAUCTION = '0x02';
  const ONHOLD = '0x00';

  const renderSwitch = (url: string) => {
    const extension = url.split('.').pop();

    if (extension) {
      switch (true) {
        case VALID_VIDEO_TYPES.includes(extension):
          return <video src={url} controls />;
        case VALID_AUDIO_TYPES.includes(extension):
          return <audio src={url} controls />;
        default:
          return <img src={url} />;
      }
    }
  };
  const [accountAddress, setAccountAddress] = useState('');

  const [listingStatus, setLisitingStatus] = useState({
    status: '',
    highestBidderAddres: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (id) {
      getCollectible(id).then(({ data }) => {
        const newInfo = { ...info };

        newInfo.status = data.status;
        newInfo.thumbnailUrl = data.thumbnailUrl ? data.thumbnailUrl : '/collectible-image.jpeg';
        newInfo.name = data.name;
        newInfo.price = data.price;
        newInfo.tokenId = data.tokenId;
        newInfo.collectibleId = data.id;
        newInfo.metamaskId = data.ownerMetamaskId;
        setInfo(newInfo);

        // web3Contract
        //   .checkCollectibleStatus(data.ownerMetamaskId, data.tokenId)
        //   .then(res => {
        //     const newListing = { ...listingStatus };
        //     newListing.status = res[0];
        //     newListing.highestBidderAddres = res[6];
        //     newListing.startTime = res[2];
        //     newListing.endTime = res[3];
        //     setLisitingStatus(newListing);
        //   })
        //   .catch(err => console.log(err.message));

      
      
      });
    }
    init();
  }, []);

  const init = async () => {
    try {
      const managerAddress = await web3Contract.requestMetamaskAccess();
    setAccountAddress(managerAddress[0]);
    } catch (error) {
      console.log(error.message)
    }
    
  };
  //auction
  const setOnAuction = async () => {
    console.log('!!!!puting on auction');

    const { price, tokenId } = info;
    const data = { price: price, status: 'onAuction' };

    if (!price) {
      setPriceError(true);
    }
    if (accountAddress != '') {
      if (typeof listingStatus == typeof ONHOLD) {
        const balance = await web3Contract.checkTokenBalance(accountAddress, parseInt(tokenId));
        console.log(balance);
        if (parseInt(balance) > 0) {
          const startTime = Math.floor(new Date().getTime() / 1000); //currentime
          const endTime = Math.floor((new Date().getTime() + 86400000) / 1000);

          const receipt = await web3Contract.setAsAuction(tokenId, price, startTime, endTime);
          receipt.wait().then((res: any) => {
            console.log(res);
            //put on auction api
            const startTime = Math.floor(new Date().getTime() / 1000); //currentime
            const endTime = Math.floor((new Date().getTime() + 86400000) / 1000); //1 day after/following day

            const auctionData = {
              price: info.price,
              startTime: startTime*1000,
              endTime: endTime*1000,
            };
            putOnAuction(info.collectibleId, auctionData)
              .then(res => {
                setShowPopup(true);
                console.log(res);
              })
              .catch(err => setShowFailedPopup(true));
          });
        }
      } else {
        setShowErrorPopup(true);
      }
    } else {
      setShowConnectionPopup(true);
    }
  };
  //on sale
  const putOnSale = async () => {
    const { price, tokenId } = info;
    const data = { price: price, status: 'onSale' };

    console.log(info.status, tokenId, accountAddress);


  //   if (!price) {
  //     setPriceError(true);
  //   }
  //   if (accountAddress != '') {
  //     const balance = await web3Contract.checkTokenBalance(accountAddress, parseInt(tokenId));
  //     console.log(balance);
  //     if (parseInt(balance) > 0) {
  //       const receipt = await web3Contract.marketplacePutOnSaleCollectible(tokenId, price.toString());
  //       receipt.wait().then((res: any) => {
  //         console.log(res);
  //         putCollectibleOnSale(id, data)
  //           .then(() => {
  //             setShowPopup(true);
  //           })
  //           .catch(() => {
  //             setShowFailedPopup(true);
  //           });
  //       });
  //     } else {
  //       setShowErrorPopup(true);
  //     }
  //   } else {
  //     setShowConnectionPopup(true);
  //   }
  // };

  // const removeItem = async (status: any) => {
  //   console.log(status);
  //   if (status == 'onSale') {
  //     console.log(info.tokenId);
  //     const response = await web3Contract.putOnHold(info.tokenId);
  //     response
  //       .wait()
  //       .then((res: any) => {
  //         removeCollectibleFromSale(id).then(() => {
  //           setShowPopup(true);
  //           location.replace('/dashboard/user');
  //         });
  //       })
  //       .catch((err: any) => console.log(err.message));
  //   } else {
  //     const response = await web3Contract.putOnHold(info.tokenId);
  //     response
  //       .wait()
  //       .then((res: any) => {
  //         removeCollectibleFromSale(id).then(() => {
  //           setShowPopup(true);
  //           location.replace('/dashboard/user');
  //         });
  //       })
  //       .catch((err: any) => console.log(err.message));
  //   }
  // };

    if (!price) {
      setPriceError(true);
    }
    if (accountAddress != '') {
      if (typeof listingStatus == typeof ONHOLD) {
        const balance = await web3Contract.checkTokenBalance(accountAddress, parseInt(tokenId));
        console.log(balance);
        if (parseInt(balance) > 0) {
          const receipt = await web3Contract.marketplacePutOnSaleCollectible(tokenId, price.toString());
          receipt.wait().then((res: any) => {
            console.log(res);
            putCollectibleOnSale(id, data)
              .then(() => {
                setShowPopup(true);
              })
              .catch(() => {
                setShowFailedPopup(true);
              });
          });
        }
      } else {
        setShowErrorPopup(true);
      }
    } else {
      setShowConnectionPopup(true);
    }
  };

  const removeItem = async (status: any) => {
    console.log('line 165', status);

    if (accountAddress == info.metamaskId) {
      if (status == 'onSale') {
        console.log(info.tokenId);
        // const listing = await web3Contract.checkCollectibleStatus(info.metamaskId, info.tokenId);
        // console.log('!!!!!!!',listing)
        if (listingStatus.status != ONSALE) {
          setShowSaleError(true);
        } else {
          const response = await web3Contract.putOnHold(info.tokenId);
          console.log(response);
          response
            .wait()
            .then((res: any) => {
              removeCollectibleFromSale(id).then(() => {
                setShowPopup(true);
                location.replace('/dashboard/user');
              });
            })
            .catch((err: any) => {
              setShowFailedPopup(true);
              alert(err.message);
            });
        }
      } else {
        const listing = await web3Contract.checkCollectibleStatus(info.metamaskId, info.tokenId);
        console.log('!!!!!!!', listing);
        console.log(listingStatus.status, ONAUCTION);
        if (listingStatus.highestBidderAddres != address0) {
          setCheckBidding(true);
        } else if (listingStatus.status != ONAUCTION) {
          setCheckBidding(true);
        } else {
          const response = await web3Contract.putOnHold(info.tokenId);
          response
            .wait()
            .then((res: any) => {
              removeCollectibleFromSale(id).then(() => {
                setShowPopup(true);
                location.replace('/dashboard/user');
              });
            })
            .catch((err: any) => console.log(err.message));
        }
      }
    } else {
      setShowAccountFailedPopup(true);
    }
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  const [showSucceedPopup, setShowSucceedPopup] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState("");

  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showConnectionPopup, setShowConnectionPopup] = useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewBidAmount((event.target.value))
  // };

  // const processNewBid = () => {
  //   // If sucessed
  //   // setShowSucceedPopup(true);
  //   // if failed;
  //   console.log(newBidAmount)
  //   setShowFailedPopup(true);

  // }

  const [showAccountFailedPopup, setShowAccountFailedPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [timeleft, setimeleft]: any = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    if (listingStatus.status == ONAUCTION) {
      if (parseInt(listingStatus.endTime) > 0) {
        setTimeout(() => {
          const timerObj = calculateTimeLeft();
          setimeleft(timerObj);
        }, 1000);
      }
    }

    // setTimeout(() => {
    //   const timerObj = calculateTimeLeft();
    //   setimeleft(timerObj);
    // }, 1000);
  });
  const calculateTimeLeft = () => {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const endTime = parseInt(listingStatus.endTime);
    //	1624161600
    const difference = moment(endTime).diff(moment(currentTime));
    console.log(difference);
    let timeLeft = {};
    timeLeft = {
      days: Math.floor(difference / (60 * 60 * 24)),
      hours: Math.floor((difference / (60 * 60)) % 24),
      minutes: Math.floor((difference / 60) % 60),
      seconds: Math.floor(difference % 60),
    };

    return timeLeft;
  };

  const transferItem = async () => {
    const currentStatus = await web3Contract.checkCollectibleStatus(info.metamaskId, info.tokenId);
    if (listingStatus.highestBidderAddres != address0) {
      await web3Contract.transferCollectible(info.tokenId, currentStatus[6]);
      setShowPopup(true);
    }
  };

const [bidPrice, setBidPrice] = useState('');
const [currentBid, setCurrentBid] = useState('');
const [bidAmount, setBidAmount]:any = useState('');
const [bidProccessing, setBidProcessing] = useState(false)
const [bidShowPopup, setBidShowPopup] = useState(false)
const [bidFailedPopup, setBidFailedPopup] = useState(false)
const [ownerFailedPopup,setOwnerFailedPopup] = useState(false)
const [error, setError] = useState<string | null>(null);

  const highestBidPrice = async()=>{
    try {
      const highestBidPrice = await web3Contract.checkCollectibleStatus(info.metamaskId, info.tokenId)  
      console.log(highestBidPrice[7])
      setBidPrice(web3.utils.fromWei(highestBidPrice[7].toString(),'ether'));
      console.log(web3.utils.fromWei(highestBidPrice[7],'ether'))
    } catch (error) {
      console.log(error.message)
    }
    
  }
  const handleCurrentBid = async()=>{
return null
  }
  const handlePutYourBid = async()=>{
    const bidValue = Number(bidAmount);
    console.log(accountAddress)
    if (accountAddress == ''){setShowConnectionPopup(true)}
    else{

      const userBalance = await web3Contract.userBalance(accountAddress);
      if (Number(bidValue) > Number(userBalance)) {
        setError('Not enough funds');
      } else if (Number(bidValue) <= Number(bidPrice)) {
        setError('Bid Should be higher than highest bid amount');
      } else if (Number(bidValue) < Number(info.price)) {
        setError('Bid Should be higher than starting price');
      } else if(accountAddress == info.metamaskId){
          setOwnerFailedPopup(true)
      }else {
        setError(null);
        console.log('bidded')
  
        try {
          setBidProcessing(true)
          const response = await web3Contract.bid(info.tokenId, info.metamaskId, bidValue);
          console.log(response);
          if(response){
            await bidCollectible(info.collectibleId, Number(bidValue));
            setBidProcessing(false)
            setBidShowPopup(true)
          }
          
        } catch (error) {
          setBidProcessing(false)
          setBidFailedPopup(true)
          console.log(error.message);
          
        }
      }
    }
    // setUserBalance(balance);
  }
  return (
    <Layout>
      <div className={classes.headers}>
        <Link className={classes.goBack} to='/dashboard/user'>
          <LeftArrowIcon /> Back
        </Link>
        <Typography variant='h2'>Increase Your Bid Now!</Typography>
        {console.log("in Edit collectible:", info)}
      </div>
      <div className={classes.container}>

        <div className={classes.col}>
          <div className={classes.buttonRow}>
            <Button variantCustom='linkButton' onClick={highestBidPrice}style={{ borderRadius: '8px', width: "400px" }}>
              The Current Highest Bid: {bidPrice} ETH
            </Button>
          </div>
          <div className={classes.buttonRow}>
            <Button  variantCustom='linkButton' onClick={handleCurrentBid}style={{ borderRadius: '8px', width: "400px" }}>
              Your Current Bid: {currentBid} ETH
            </Button>
          </div>
          <div className={classes.buttonRow}>
            <div style={{ width: "400px" }}>
              <TextField
                
                id='newBidAmount'
                placeholder='Increase your amount...'
                name='newBidAmount'
                onChange={(e)=>setBidAmount(e.target.value)}
                type="number"/>

            {error && <div className={classes.errorMessage}>{error}</div>}
        <div className={classes.leftCol}>
          {/* <div className={classes.fileWrapper}>{renderSwitch(info.thumbnailUrl)}</div> */}
        </div>
        <div className={classes.rightCol}>
          <div className={classes.rightColContainer}>
            <div className={classes.rightColHeader}>
              {/* <Typography variant='h6' className={classes.artLabel}>
                ART
              </Typography> */}
              {/* <Typography variant='h1'>{info.name}</Typography> */}
            </div>

            {/*<div className={classes.ownerContainer}>
		                    <div className={classes.imageWrapper}>
		                        <Avatar size={48} alt="Profile photo" status="premium" image="https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240"/>
		                    </div>
		                    <div className={classes.artistInfo}>
		                        <Typography variant="subtitle1" className={classes.artistRole}>{text['owner']}</Typography>
		                        <a target="_blank" rel="noreferrer" href={`https://ropsten.etherscan.io/address/djfkdsfjldskjfds`}>
		                            <Typography variant="h3">dsjfkdlsjfldksjf</Typography>
		                        </a>
		                    </div>
		                </div>*/}
            {/* <label htmlFor='type'>**Your item is on </label> */}
            <div className={classes.form}>
              {/**info.status == 'onAuction' ? (
                <FormControl className={classes.fieldGroup}>
                  <label htmlFor='type'>Collectible current price</label>
                  <Input
                    id='type'
                    name='type'
                    onChange={e => {
                      const newInfo = { ...info, price: Number(e.target.value) };

                      setInfo(newInfo);
                    }}
                    value={info.price}
                  />
                  {priceError && <small className={classes.inputError}>{text['fieldIsRequired']}</small>}

                  {/* <Button variantCustom="action" type="submit" style={{ backgroundColor: '#5113D5' }}>Change price</Button> }
                </FormControl>
              ) : null **/}

              {/* <div style={{ width: "400px" }}>
              <TextField
                
                id='newBidAmount'
                placeholder='Increase your amount...'
                name='newBidAmount'
                type="number"

                onChange={handleChange}

              />
            </div> */}
            </div>

          </div>
          {bidProccessing&&<div className={classes.errorMessage}>In Processing...</div>}
          <div className={classes.buttonRow}>
            <Button  variantCustom='action' disabled={bidProccessing} style={{ width: "400px" }} onClick={handlePutYourBid}>
              Confirm Your Bid
            </Button>
          </div>

        
            {/* <div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props:any) => <TextField {...props} />}
                  label='DateTimePicker'
                  value={value}
                  onChange={(newValue: any) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
			</div> */}
            {/* {info.status == 'onHold' ? (
              <div style={{ marginLeft: '120px' }}>
                <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                <span>Put on Auction</span>
              </div>
            ) : null} */}

            {/* {checked ? (
              <>
                <div style={{ marginLeft: '120px' }}>
                  <Input
                    id='size'
                    placeholder='YYYY-MM-DD HH:MM'
                    name={startDate}
                    //onChange={handleStart}
                  />
                  {/* {errors.properties && (
                      <p className={classes.textError}>
                        {errors.properties.name ? errors.properties.name.message : ''}
                      </p>
                    )} }
                </div>
                <div>
                  <Input
                    placeholder='YYYY-MM-DD HH:MM'
                    //onChange={handleEnd}
                    name={endDate}
                  />
                  {/* {errors.properties && (
                      <p className={classes.textError}>
                        {errors.properties.value ? errors.properties.value.message : ''}
                      </p>
                    )} }
                </div>
              </>
            ) : null} */}
            <div className={classes.submits}>
              {info.status == 'onHold' ? (
                <>
                  <Button variantCustom='action' style={{ backgroundColor: '#ff0099' }} onClick={() => putOnSale()}>
                    Put on Sale
                  </Button>
                  <Button
                    variantCustom='action'
                    style={{ backgroundColor: '#ff0099' }}
                    type='submit'
                    onClick={() => setOnAuction()}
                    disabled={!checked}
                  >
                    Put on Auction
                  </Button>
                </>
              ) : null}

              {info.status == 'onSale' ? (
                <Button
                  variantCustom='action'
                  style={{ backgroundColor: '#ff0099', padding: '10px' }}
                  onClick={() => removeItem(info.status)}
                >
                  Remove from {info.status.slice(2)}
                </Button>
              ) : null}
            </div>
            <div className={classes.auctionTimer}>
              {listingStatus.status === ONAUCTION ? (
                <>
                  {' '}
                  <h1 className={classes.artLabel}>Auction Ends In:</h1>
                  <p style={{ fontSize: '15px', }}>
                    <span>
                      <strong>Days: </strong> {timeleft.days}
                    </span>
                    <span>
                      <strong>Hours: </strong> {timeleft.hours}
                    </span>
                    <span>
                      <strong>Minutes:</strong> {timeleft.minutes}
                    </span>
                    <span>
                      <strong>Seconds:</strong> {timeleft.seconds}
                    </span>
                  </p>
                  {parseInt(listingStatus.endTime) == 0 ? (
                    <Button
                      variantCustom='action'
                      style={{ backgroundColor: '#ff0099', padding: '10px' }}
                      onClick={transferItem}
                    >
                      Transfer
                    </Button>
                  ) : null}
                </>
              ) : null}

              {/* <h1 className={classes.artLabel}>Auction Ends In:</h1>
              <p style={{ fontSize: '15px' }}>
                <span>
                  <strong>Days: </strong> {timeleft.days}
                </span>
                <span>
                  <strong>Hours: </strong> {timeleft.hours}
                </span>
                <span>
                  <strong>Minutes:</strong> {timeleft.minutes}
                </span>
                <span>
                  <strong>Seconds:</strong> {timeleft.seconds}
                </span>
              </p> */}
            </div>
          </div>

        </div>

      </div>
      </div>
      </div>
      <MUIModal open={showSucceedPopup} onClose={() => location.replace('/dashboard/user')}>
        <div className={classes.popupcontainer}>
          <div className={classes.wrapper}>
            <div className={classes.close} onClick={() => location.replace('/dashboard/user')}>x</div>
            <div className={classes.header}>{"Your bid increased! Your current bid price is"}</div>
            <div className={classes.divider} />
            <div className={classes.bottomheader}>{newBidAmount} ETH</div>
            <div className={classes.divider} />
            <Button  variantCustom='action' style={{ marginLeft: "35%", marginTop:"3px"}} onClick={() => { location.replace('/dashboard/user') }}>
              Ok
            </Button>
          </div>
        </div>
      </MUIModal>
      <MUIModal open={showFailedPopup} onClose={() => {setShowFailedPopup(false)}}>
        <div className={classes.popupcontainer}>
          <div className={classes.wrapper}>
            <div className={classes.close} onClick={() => {setShowFailedPopup(false)}}>x</div>
            <div className={classes.header}>{"You fail to increase you bid, please try again."}</div>
            <div className={classes.divider} />
            <Button  variantCustom='action' style={{ marginLeft: "35%", marginTop:"3px"}} onClick={() => {setShowFailedPopup(false)}}>
              Ok
            </Button>
          </div>
        </div>
      </MUIModal>
      <Popup
        open={showConnectionPopup}
        textheader={'Please connect to metamask'}
        onClose={() => setShowConnectionPopup(false)}
      ></Popup>
      <Popup
        open={ownerFailedPopup}
        textheader={'Bid Failed;;Owner cannot place bid'}
        onClose={() => setOwnerFailedPopup(false)}
      ></Popup>
      <Popup
        open={showFailedPopup}
        textheader={'Collectible status;;You failed to update your collectible status, Please try again'}
        onClose={() => setShowFailedPopup(false)}

      ></Popup> 
      <Popup
        open={showPopup}
        textheader={'Successfully done'}
        onClose={() => setShowPopup(false)}

      ></Popup> 
      <Popup
        open={bidShowPopup}
        textheader={'Bid status;;The Item was successfully bid'}
        onClose={() => setBidShowPopup(false)}
      ></Popup>
      <Popup
        open={bidFailedPopup}
        textheader={'Bid status;;Bid Failed'}
        onClose={() => setBidFailedPopup(false)}
      ></Popup>
      <Popup
        open={showAccountFailedPopup}
        textheader={
          'Bid Failed;;You failed to update your collectible status, You are not the owner of this collectible'
        }
        onClose={() => setShowAccountFailedPopup(false)}
      ></Popup>
      <Popup
        open={checkBidding}
        textheader={'Collectible status;;You failed to remove from Auction, Bidding has already started'}
        onClose={() => setCheckBidding(false)}
      ></Popup>
      <Popup
        open={showSaleError}
        textheader={'Collectible status;;You failed to remove from Sale'}
        onClose={() => setShowSaleError(false)}
      ></Popup>

    </Layout>
  );
}
