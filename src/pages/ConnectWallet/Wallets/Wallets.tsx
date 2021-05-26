import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Typography, Divider, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useDispatch } from 'react-redux';
import text from '../../../../public/content';
import { FullLogo } from 'components/icons';
import { useWallets } from '../../../hooks/useWallet';
import Modal from 'components/widgets/Modal';
import Button from 'components/button';
import { changePermittedToUseWallet } from 'state/app/actions';
// import { addUser } from 'api/user'
import useStyles from './Wallets.style';
import WalletOption from '../WalletOption';

function Wallets(): JSX.Element {
  const dispatch = useDispatch();
  const { account } = useWeb3React<Web3Provider>();
  const [isErrorModal, setShowErrorModal] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [fields, setFields] = React.useState({ age: false, terms: false });
  const classes = useStyles();
  const wallets = useWallets();
  const history = useHistory();

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [challenge, setChallege] = useState(null);
  const [signature, setSignature] = useState(null);

  const openTerms = () => setOpen(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFields({ ...fields, [event.target.name]: event.target.checked });
  const onSubmit = async () => {
    if (account) {
      // await addUser(account)
      dispatch(changePermittedToUseWallet(true));

      history.push('/');
    }
  };
  const handleGoBack = () => history.back();

  const { age, terms } = fields;
  const error = [age, terms].filter(v => v).length !== 2;

  return (
    <div className={classes.container}>
      <div className={classes.walletsModal}>
        <div className={classes.modalHeader}>
          <FullLogo />
        </div>
        <div className={classes.content}>
          <div className={classes.info}>
            <Button className={classes.backBtn} onClick={handleGoBack}>
              <ArrowBackIcon />
              <Typography variant='h5'>{text['goBack']}</Typography>
            </Button>
            <Typography className={classes.backBtnText} variant='h2'>
              {text['cnYourWallet']}
            </Typography>
            <Divider classes={{ root: classes.divider }} />
            <Typography className={classes.privateRules} variant='h6'>
              {text['weDontOwnKeys']}
            </Typography>
          </div>
          <div className={classes.connectors}>
            <WalletOption
              onRequestError={() => {
                setShowErrorModal(true);
              }}
              wallet={wallets[0]}
              openTerms={openTerms}
            />
          </div>
        </div>
      </div>
      <Modal open={isErrorModal} onClose={() => setShowErrorModal(false)}>
        <div className={classes.errorModal}>
          <div className={classes.errorModalTitle}>{text['youHaveClosedMetamask']}</div>
          <div className={classes.errorModalContent}>{text['pleaseTryConnectYourWalletManually']}</div>
          <Button variantCustom='action' className={classes.errorModalBtn} onClick={() => setShowErrorModal(false)}>
            Proceed
          </Button>
        </div>
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.termsModal}>
          <div className={classes.termsModalTitle}>{text['termsOfServiceDomain']}</div>
          <p className={classes.termsModalDscr}>
            {/* <Trans
              i18nKey='termsOfServiceDomainInfo'
              values={{ domain: 'Satoshi.ART' }}
              components={{ 1: <a href='#' /> }}
            /> */}
          </p>
          <form className={classes.termsModalForm}>
            <FormControl required error={error} component='fieldset'>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={age} onChange={handleChange} name='age' />}
                  label={text['atLeast13YearOld']}
                />
                <FormControlLabel
                  control={<Checkbox checked={terms} onChange={handleChange} name='terms' />}
                  label={text['acceptTermsOfService']}
                />
              </FormGroup>
            </FormControl>
            <Button
              onClick={onSubmit}
              disabled={error}
              className={classes.termsModalBtn}
              label={text['connectWallet']}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Wallets;
