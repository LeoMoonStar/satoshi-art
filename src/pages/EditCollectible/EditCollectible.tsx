import React, { useState, useEffect } from 'react';
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
import { getCollectible, putCollectibleOnSale, removeCollectibleFromSale } from 'apis/collectibles';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from 'components/layout';
import Button from 'components/button';
import Avatar from 'components/avatar';
import Popup from 'components/widgets/Popup';

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
  });
  const [priceError, setPriceError] = useState(false);
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [checked, setChecked] = React.useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
  useEffect(() => {
    if (id) {
      getCollectible(id).then(({ data }) => {
        const newInfo = { ...info };

        newInfo.status = data.status;
        newInfo.thumbnailUrl = data.thumbnailUrl ? data.thumbnailUrl : '/collectible-image.jpeg';
        newInfo.name = data.name;
        newInfo.price = data.price;
        newInfo.tokenId = data.tokenId;

        setInfo(newInfo);
      });
    }
    init();
  }, []);

  const init = async () => {
    const managerAddress = await web3Contract.requestMetamaskAccess();
    setAccountAddress(managerAddress[0]);
  };
  //auction
  const putOnAuction = async () => {
    console.log('!!!!puting on auction');

    const { price, tokenId } = info;
    const data = { price: price, status: 'onAuction' };

    if (!price) {
      setPriceError(true);
    }
    if (accountAddress != '') {
      const balance = await web3Contract.checkTokenBalance(accountAddress, parseInt(tokenId));
      console.log(balance);
      if (parseInt(balance) > 0) {
        const startTime = Math.floor(new Date().getTime() / 1000); //currentime
        const endTime = Math.floor((new Date().getTime() + 86400000) / 1000);

        const receipt = await web3Contract.setAsAuction(tokenId, price, startTime, endTime);
        receipt.wait().then((res: any) => {
          console.log(res);
          //   putCollectibleOnSale(id, data)
          //     .then(() => {
          //       setShowPopup(true);
          //     })
          //     .catch(() => {
          //       setShowFailedPopup(true);
          //     });
        });
      } else {
        setShowErrorPopup(true);
      }
    } else {
      setShowConnectionPopup(true);
    }
  };
  //on sale
  // const putOnSale = async () => {
  //   const { price, tokenId } = info;
  //   const data = { price: price, status: 'onSale' };

    // console.log(info.status, tokenId, accountAddress);

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


  /*const removeFromSale = () => {
      removeCollectibleFromSale(id)
        .then(() => {
          location.replace('/dashboard/user')
        })
    }*/

  const [showSucceedPopup, setShowSucceedPopup] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState("");

  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showConnectionPopup, setShowConnectionPopup] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBidAmount((event.target.value))
  };

  const processNewBid = () => {
    // If sucessed
    // setShowSucceedPopup(true);
    // if failed;
    setShowFailedPopup(true);
  }
  return (
    <Layout>
      <div className={classes.headers}>
        <Link className={classes.goBack} to='/dashboard/user'>
          <LeftArrowIcon /> Back
        </Link>
        <Typography variant='h2'>Increasw Your Bid Now!</Typography>
        {console.log("in Edit collectible:", info)}
      </div>
      <div className={classes.container}>
        <div className={classes.col}>
          <div className={classes.buttonRow}>
            <Button variantCustom='linkButton' style={{ borderRadius: '8px', width: "400px" }}>
              The Current Highest Bid: ETH
            </Button>
          </div>
          <div className={classes.buttonRow}>
            <Button  variantCustom='linkButton' style={{ borderRadius: '8px', width: "400px" }}>
              Your Current Bid: ETH
            </Button>
          </div>
          <div className={classes.buttonRow}>
            <div style={{ width: "400px" }}>
              <TextField
                
                id='newBidAmount'
                placeholder='Increase your amount...'
                name='newBidAmount'
                type="number"

                onChange={handleChange}

              />
            </div>
          </div>

          <div className={classes.buttonRow}>
            <Button  variantCustom='action' style={{ width: "400px" }} onClick={() => { processNewBid() }}>
              Confirm Your Bid
            </Button>
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
      {/* <Popup
        open={showConnectionPopup}
        textheader={'Please connect to metamask'}
        onClose={() => setShowConnectionPopup(false)}
      ></Popup>
      <Popup
        open={showFailedPopup}
        textheader={'Collectible status;;You failed to update your collectible status, Please try again'}
        onClose={() => setShowFailedPopup(false)}
      ></Popup> */}
    </Layout>
  );
}
