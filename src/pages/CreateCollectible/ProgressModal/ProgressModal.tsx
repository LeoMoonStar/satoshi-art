import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepIconProps, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import text from '../../../constants/content';
import Modal from 'components/widgets/Modal';
import Button from 'components/button';
import { CheckIcon } from 'components/icons';

// import { CheckIcon } from 'components/icons'
import useStyles from './ProgressModal.style';

const CONNECTION_STEPS = ['Approval', 'Token', 'Sign', 'Complete'];

function MyStepCircle(props: StepIconProps) {
  const classes = useStyles();
  const { active, completed } = props;

  return <div className={clsx(classes.label, { [classes.active]: active, [classes.completed]: completed })} />;
}
type ProgressModalProps = {
  open: boolean;
  onClose: () => void;
  onTryAgain: () => void;
  createTokenError: string;
};
export default function ProgressModal({
  open,
  onTryAgain,
  createTokenError,
  onClose,
}: ProgressModalProps): JSX.Element {
  const classes = useStyles();
  const [activeStep] = useState<number>(2);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.container}>
        <div className={classes.title}>Almost there...</div>
        <Stepper alternativeLabel activeStep={activeStep} classes={{ root: classes.stepper }}>
          {CONNECTION_STEPS.map(label => (
            <Step key={label}>
              <StepLabel classes={{ labelContainer: classes.labelContainer }} StepIconComponent={MyStepCircle}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.stepsContent}>
          <div className={classes.step}>
            <div className={classes.stepDescription}>
              <CheckIcon />

              <div className={classes.stepTitle}>
                <span>Approve</span>
                <span>Approve performing transactions with your wallet</span>
              </div>
            </div>
            <Button className={classes.disableButton}>In progress...</Button>
          </div>

          {createTokenError ? (
            <div className={classes.step}>
              <div className={classes.stepDescription}>
                <div className={classes.stepTitle}>
                  <span className={classes.error}>{createTokenError}</span>
                </div>
              </div>
              <Button variantCustom='action' className={classes.tryAgain} onClick={onTryAgain}>
                {text['tryAgain']}
              </Button>
            </div>
          ) : (
            <div className={classes.step}>
              <div className={classes.stepDescription}>
                <CircularProgress classes={{ root: classes.loader }} size={22} color='secondary' />

                <div className={classes.stepTitle}>
                  <span>Upload files & Mint token</span>
                  <span>Call contract method</span>
                </div>
              </div>

              <Button className={classes.disableButton}>In progress...</Button>
            </div>
          )}

          <div className={classes.step}>
            <div className={classes.stepDescription}>
              <CheckIcon />

              <div className={classes.stepTitle}>
                <span>Sign sell order</span>
                <span>Sign sell order using your Wallet</span>
              </div>
            </div>
            <Button className={classes.disableButton}>In progress...</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
