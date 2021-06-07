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

import { getCollectible, buyCollectible } from 'apis/collectibles';

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
  price: number;
  onClose: () => void;
};

export default function ProgressModal({ price, onClose }: ProgressModalProps): JSX.Element {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [approve, setApprove] = useState(false);
  const [signed, setSigned] = useState(false);
  const [web3, setWeb3] = useState(undefined);
  const [tokenId, setTokenId] = useState<number>(0);
  const [clickedSigned, setClickedSigned] = useState(false);
  const [showTxHash, setShowTxHash] = useState('');
  // console.log(store.getState());
  useEffect(() => {
    console.log('line42', id);
    checkBalance();
  }, []);

  const checkBalance = async () => {
    const metamaskAddr = readCookie('metamask_address');
    const { data } = await getCollectible(id);
    const metamaskId: any = data;
    setTokenId(parseInt(data.tokenId));
    
    console.log(metamaskId.ownerMetamaskId);
    if (metamaskId.ownerMetamaskId != '') {
      const balance = await web3Contract.checkTokenBalance(metamaskId.ownerMetamaskId, 89 as number);
      if (balance > 0) {
        setApprove(true);
        setActiveStep(1);
      } else {
        alert('Insufficient Tokens');
        onClose();
      }
    } else {
      alert('Please connect to metamask first');
    }
  };

  const startSignature = async () => {
    const metamaskAddr = readCookie('metamask_address');
    const { data } = await getCollectible(id);
    const metamaskId: any = data;
    setClickedSigned(true);
    const result = await web3Contract.marketplaceBuyCollectible(
      metamaskId.tokenId,
      metamaskId.ownerMetamaskId,
      metamaskId.price.toString()
    );
    console.log(result);
    result.wait().then((res: any) => {
      setSigned(true);
      setClickedSigned(false);
      setActiveStep(2);
      setShowTxHash(res.transactionHash);

      buyCollectible(id, price)
    });
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
                <Button style={{ backgroundColor: '#FF0099' }} onClick={startSignature}>
                  In Progress...
                </Button>
                <span>Do not close this window</span>
              </>
            ) : (
              <Button style={{ backgroundColor: '#FF0099' }} onClick={startSignature}>
                Start
              </Button>
            )}
            <div className={classes.stepTitle} style={{ overflow: 'scroll' }}>
              <span>{showTxHash}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
