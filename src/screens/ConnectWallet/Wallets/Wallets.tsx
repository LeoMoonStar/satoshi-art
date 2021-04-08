import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Typography,
    Divider,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation, Trans } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useDispatch } from 'react-redux'

import { FullLogo } from 'shared/icons'
import { useWallets } from 'hooks/useWallets'
import Modal from 'shared/Modal'
import Button from 'shared/Button'
import { changePermittedToUseWallet } from 'state/app/actions'
// import { addUser } from 'api/user'
import useStyles from './Wallets.style'
import WalletOption from '../WalletOption'

function Wallets(): JSX.Element {
    const dispatch = useDispatch()
    const { account } = useWeb3React<Web3Provider>()
    const [isErrorModal, setShowErrorModal] = useState<boolean>(false)

    const [open, setOpen] = useState<boolean>(false)
    const [fields, setFields] = React.useState({
        age: false,
        terms: false,
    })
    const classes = useStyles()
    const wallets = useWallets()
    const history = useHistory()
    const { t } = useTranslation()

    const openTerms = () => {
        setOpen(true)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [event.target.name]: event.target.checked })
    }

    const onSubmit = async () => {
        if (account) {
            // await addUser(account)
            dispatch(changePermittedToUseWallet(true))
            window.location.href = '/'
        }
    }
    const handleGoBack = () => history.goBack()

    const { age, terms } = fields
    const error = [age, terms].filter((v) => v).length !== 2
    return (
        <div className={classes.container}>
            <div className={classes.walletsModal}>
                <div className={classes.modalHeader}>
                    <FullLogo />
                </div>
                <div className={classes.content}>
                    <div className={classes.info}>
                        <Button
                            className={classes.backBtn}
                            onClick={handleGoBack}
                        >
                            <ArrowBackIcon />
                            <Typography variant="h5">{t('goBack')}</Typography>
                        </Button>
                        <Typography
                            className={classes.backBtnText}
                            variant="h2"
                        >
                            {t('cnYourWallet')}
                        </Typography>
                        <Divider
                            classes={{
                                root: classes.divider,
                            }}
                        />
                        <Typography
                            className={classes.privateRules}
                            variant="h6"
                        >
                            {t('weDontOwnKeys')}
                        </Typography>
                    </div>
                    <div className={classes.connectors}>
                        {/*@TODO: add array mapping when array will have more wallets*/}
                        <WalletOption
                            onRequestError={() => setShowErrorModal(true)}
                            wallet={wallets[0]}
                            openTerms={openTerms}
                        />
                    </div>
                </div>
            </div>
            <Modal open={isErrorModal} onClose={() => setShowErrorModal(false)}>
                <div className={classes.errorModal}>
                    <div className={classes.errorModalTitle}>
                        Something went wrong
                    </div>
                    <div className={classes.errorModalContent}>
                        Please try open {'"Metamask extenssion"'} manually in
                        your browser.
                    </div>
                    <Button
                        variantCustom="action"
                        className={classes.errorModalBtn}
                        onClick={() => setShowErrorModal(false)}
                    >
                        Proceed
                    </Button>
                </div>
            </Modal>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className={classes.termsModal}>
                    <div className={classes.termsModalTitle}>
                        {t('termsOfServiceDomain', { domain: 'Satoshi.ART' })}
                    </div>
                    <p className={classes.termsModalDscr}>
                        <Trans
                            i18nKey="termsOfServiceDomainInfo"
                            values={{
                                domain: 'Satoshi.ART',
                            }}
                            components={{ 1: <a href="#" /> }}
                        />
                    </p>
                    <form className={classes.termsModalForm}>
                        <FormControl
                            required
                            error={error}
                            component="fieldset"
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={age}
                                            onChange={handleChange}
                                            name="age"
                                        />
                                    }
                                    label={t('atLeast13YearOld')}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={terms}
                                            onChange={handleChange}
                                            name="terms"
                                        />
                                    }
                                    label={t('acceptTermsOfService', {
                                        domain: 'Satoshi.ART',
                                    })}
                                />
                            </FormGroup>
                        </FormControl>
                        <Button
                            onClick={onSubmit}
                            disabled={error}
                            className={classes.termsModalBtn}
                            label={t('connectWallet')}
                        />
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Wallets
