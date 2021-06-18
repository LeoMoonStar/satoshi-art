import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stepper, Step, StepLabel, StepIconProps, CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import Modal from 'components/widgets/Modal';
import Button from 'components/button';

import { readCookie } from '../../../apis/cookie';

import web3Contract from 'abis/web3contract';
import { CheckIcon } from 'components/icons';
import useStyles from './ProgressModal.style';

import { getCollectible, buyCollectible, bidCollectible } from 'apis/collectibles';
import { getDropOfTheDay } from 'apis/users';

import { Receipt } from '@material-ui/icons';
const CONNECTION_STEPS = ['Approval', 'Signture', 'Complete'];

export function MyStepCircle(props: StepIconProps): JSX.Element {
  const classes = useStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.label, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    />
  );
}
type ProgressModalProps = {
  name: string;
  price: number;
  status: string;
  currentBidValue: number;
  onClose: () => void;
  openSucessBox: () => void;
  openFailedBox: () => void;
  openOwnerFailedBox: () => void;
  openBidPopup: any
};

export default function ProgressModal({
  name,
  price,
  status,
  currentBidValue,
  onClose,
  openSucessBox,
  openFailedBox,
  openOwnerFailedBox,
  openBidPopup
}: ProgressModalProps): JSX.Element {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [approve, setApprove] = useState(false);
  const [signed, setSigned] = useState(false);
  const [web3, setWeb3] = useState(undefined);
  const [tokenId, setTokenId] = useState<number>(0);
  const [clickedSigned, setClickedSigned] = useState(false);
  const [showTxHash, setShowTxHash] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [dropOfTheDay, setDropOfTheDay] = useState(false);

  useEffect(() => {
    console.log('progress modal status', status);
    checkDropOfTheDay();
    checkBalance();
  }, []);

  //check for if productId is dropOsTheDay
  const checkDropOfTheDay = async () => {
    const { data: response } = await getDropOfTheDay();
    console.log('checkDropOfTheDay');

    const filtered = response.filter((collectibleId: any) => collectibleId.id == id);

    if (filtered.length > 0) {
      console.log('this is drop of the day');
      setDropOfTheDay(true);
    }
  };
  const checkBalance = async () => {
    const metamaskAddr = readCookie('metamask_address');
    const { data } = await getCollectible(id);
    const metamaskId: any = data;
    setTokenId(parseInt(data.tokenId));
    setOwnerAddress(metamaskId.ownerMetamaskId);
    console.log(metamaskId.ownerMetamaskId, data.tokenId);
    if (metamaskId.ownerMetamaskId != '') {
      if (data.ownerMetamaskId != metamaskAddr) {
        const balance = await web3Contract.checkTokenBalance(metamaskId.ownerMetamaskId, data.tokenId);
        console.log('!!!!!!', balance);
        if (parseInt(balance) > 0) {
          setApprove(true);
          // openSucessBox();
          setActiveStep(1);
        } else {
          alert('Number of copies available is 0');
          onClose();
          openFailedBox();
        }
      } else {
        onClose();
        openOwnerFailedBox();
      }
    } else {
      alert('Please connect to metamask first');
    }
  };

  const startBidSignature = async () => {
    console.log('!!!!!!!!!!!!! Start Bidding !!!!!!!!!!!');
    const metamaskAddr = readCookie('metamask_address');
    const { data } = await getCollectible(id);
    const metamaskId: any = data;
    console.log(tokenId, data.ownerMetamaskId, price, currentBidValue);
    //owner cannot bid
    try {
      const response = await web3Contract.bid(tokenId, data.ownerMetamaskId, currentBidValue);
      console.log(response);
      setClickedSigned(false);
      setActiveStep(2);
      setSigned(true);
      await bidCollectible(data.id, Number(currentBidValue));
      openBidPopup();
    } catch (error) {
      console.log(error.message);
      openFailedBox();
    }
  };
  const startSignature = async () => {
    const metamaskAddr = readCookie('metamask_address');
    const { data } = await getCollectible(id);
    const metamaskId: any = data;
    console.log('!!!!!!!!!!!!! Start Signature !!!!!!!!!!!');
    console.log(metamaskId);
    if (dropOfTheDay) {
      const dropResult = await web3Contract
        .dropOfTheDayBuy(metamaskId.tokenId, metamaskId.ownerMetamaskId, metamaskId.price.toString())
        .then((res: any) => {
          setClickedSigned(false);
          setActiveStep(2);
          setShowTxHash(res.transactionHash);
          buyCollectible(id, price)
            .then(res => {
              console.log('onclose #1');
              openSucessBox();
              setSigned(true);

              onClose();
            })
            .catch(error => {
              openFailedBox();
            });
        })
        .catch(error => {
          openFailedBox();
        });

      // dropResult.wait();
    } else {
      //regular collectible
      const result = await web3Contract
        .marketplaceBuyCollectible(metamaskId.tokenId, metamaskId.ownerMetamaskId, metamaskId.price.toString())
        .then((res: any) => {
          setClickedSigned(false);
          setActiveStep(2);
          setShowTxHash(res.transactionHash);
          buyCollectible(id, price)
            .then(res => {
              console.log('onclose #2');
              openSucessBox();
              setSigned(true);
              onClose();
            })
            .catch(error => {
              openFailedBox();
            });
        })
        .catch((err: any) => alert(err.message));

      // setClickedSigned(true);
      // setSigned(true);
      // console.log(result);

      // result.wait().then((res: any) => {

      //   setSigned(false);
      //   setClickedSigned(false);
      //   setActiveStep(2);
      //   setShowTxHash(res.transactionHash);

      //   buyCollectible(id, price)
      //     .then((res) => {
      //       console.log("onclose #2")
      //       openSucessBox();

      //       onClose()
      //     })
      //     .catch((error) => {
      //       openFailedBox()
      //     })
      // }).catch((err: any) => alert(err.message))
    }
  };
  return (
    <Modal open onClose={onClose}>
      <div className={classes.container}>
        <div className={classes.title}>Processing</div>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          classes={{
            root: classes.stepper,
          }}
        >
          {CONNECTION_STEPS.map(label => (
            <Step key={label}>
              <StepLabel
                classes={{
                  labelContainer: classes.labelContainer,
                }}
                StepIconComponent={MyStepCircle}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.stepsContent}>
          <div className={classes.step}>
            <div className={classes.stepDescription}>
              {approve ? (
                <CheckIcon color='secondary' />
              ) : (
                <CircularProgress
                  classes={{
                    root: classes.loader,
                  }}
                  size={22}
                  color='secondary'
                />
              )}
              <div className={classes.stepTitle}>
                <span>Approve</span>
                <span>Checking balance and approving</span>
              </div>
            </div>
            <Button>{approve ? 'Done' : 'In progress...'}</Button>
          </div>

          <div className={classes.step}>
            <div className={classes.stepDescription}>
              {signed ? (
                <CheckIcon color='secondary' />
              ) : (
                <CircularProgress
                  classes={{
                    root: classes.loader,
                  }}
                  size={22}
                  color='secondary'
                />
              )}
              <div className={classes.stepTitle}>
                <span>Signature</span>
                <span>Create a signature to place a bid</span>
              </div>
            </div>
            {signed ? (
              <>
                <Button style={{ backgroundColor: '#FF0099' }}>In Progress...</Button>
                {/* <span>Do not close this window</span> */}
              </>
            ) : (
              <>
                {status == 'bid' ? (
                  <Button style={{ backgroundColor: '#FF0099' }} onClick={startBidSignature}>
                    {activeStep == 2 ? 'Done' : 'Start'}
                  </Button>
                ) : (
                  <Button style={{ backgroundColor: '#FF0099' }} onClick={startSignature}>
                    {activeStep == 2 ? 'Done' : 'Start'}
                  </Button>
                )}
              </>
            )}
            {/* <div className={classes.stepTitle} style={{ overflow: 'scroll' }}>
              <span>{showTxHash}</span>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
