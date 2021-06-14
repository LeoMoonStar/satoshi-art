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
import text from 'constants/content';
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
  const [info, setInfo] = useState({
    status: '',
    thumbnailUrl: '',
    name: '',
    price: 0,
    tokenId: '',
  });
  const [priceError, setPriceError] = useState(false);
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
  const putOnSale = async () => {
    const { price, tokenId } = info;
    const data = { price: price, status: 'onSale' };
    const auctionData = { price: price };

    // console.log(info.status, tokenId, accountAddress);

    if (!price) {
      setPriceError(true);
    }
    if (accountAddress != '') {
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
      } else {
        alert("you don't have enough copies of this item");
      }
    } else {
      alert('Please connect to metamask');
    }
  };

  const removeItem = async (status:any) =>{
console.log(status)
if(status=='onSale'){
	console.log(info.tokenId)
	const response = await web3Contract.putOnHold(info.tokenId);
	response.wait().then((res:any) =>{
		removeCollectibleFromSale(id)
		.then(() => {
			setShowPopup(true);
			location.replace('/dashboard/user')
		})
	}).catch((err: any) =>console.log(err.message));
	
}
else{
	const response = await web3Contract.putOnHold(info.tokenId);
	response.wait().then((res:any) =>{
		removeCollectibleFromSale(id)
		.then(() => {
			setShowPopup(true);
			location.replace('/dashboard/user')
		})
	}).catch((err: any) =>console.log(err.message));
}
  }
  /*const removeFromSale = () => {
    	removeCollectibleFromSale(id)
    		.then(() => {
    			location.replace('/dashboard/user')
    		})
    }*/

  const [showPopup, setShowPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);

  return (
    <Layout>
      <div className={classes.headers}>
        <Link className={classes.goBack} to='/'>
          <LeftArrowIcon /> {text['backToHomePage']}
        </Link>
        <Typography variant='h2'>Collectible editing</Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.leftCol}>
          <div className={classes.fileWrapper}>{renderSwitch(info.thumbnailUrl)}</div>
        </div>
        <div className={classes.rightCol}>
          <div className={classes.rightColContainer}>
            <div className={classes.rightColHeader}>
              <Typography variant='h6' className={classes.artLabel}>
                ART
              </Typography>
              <Typography variant='h1'>{info.name}</Typography>
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

                {/* <Button variantCustom="action" type="submit" style={{ backgroundColor: '#5113D5' }}>Change price</Button> */}
              </FormControl>
             
                {/* <FormControl className={classes.fieldGroup}>
                  <label htmlFor='issue'>Collection</label>
                  <Select id='issue' name='issue'>
                    {COLLECTION_OPTIONS.map((issue: string, index: number) => (
                      <MenuItem
                        value={index}
                        key={index}
                        onClick={() => {
                          const newInfo = { ...info, status: issue };

                          setInfo(newInfo);
                        }}
                      >
                        {text[issue]}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variantCustom='action'
                    type='submit'
                    style={{ backgroundColor: '#5113D5' }}
                    onClick={() => {
                      setInfo({ ...info, status: 'remove' });
                    }}
                  >
                    Remove From Sale
                  </Button>
                </FormControl> */}
             
            </div>
            <div className={classes.submits}>
              {info.status == 'onHold'? (
				  <>
                <Button variantCustom='action' style={{ backgroundColor: '#ff0099' }} onClick={() => putOnSale()}>
                  Put on Sale
                </Button>
				<Button variantCustom='action' style={{ backgroundColor: '#ff0099' }} type='submit'>
                  Put on Auction
                </Button>
				</>
              ) :null}

              {info.status == 'onSale' || info.status=='onAuction'? (
                <Button variantCustom='action' style={{ backgroundColor: '#ff0099' }} onClick={() => removeItem(info.status)}>
				Remove from {info.status}
			  </Button>
              ) :null}
            </div>
          </div>
        </div>
      </div>
      <Popup
        open={showPopup}
        textheader={'Owned collectible status change;;Your collectible status has been changed!'}
        onClose={() => location.replace('/dashboard/user')}
      ></Popup>
      <Popup
        open={showFailedPopup}
        textheader={'Collectible status;;You failed to update your collectible status, Please try again'}
        onClose={() => setShowFailedPopup(false)}
      ></Popup>
    </Layout>
  );
}
