import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
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

import { useWallets } from 'hooks/useWallets'
import Modal from 'shared/Modal'
import Button from 'shared/Button'
import { LogoIcon } from 'shared/icons'

import useStyles from './Wallets.style'
import WalletOption from '../WalletOption'

function Wallets(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const [fields, setFields] = React.useState({
        age: false,
        terms: false,
    })
    const classes = useStyles()
    const wallets = useWallets()
    const { t } = useTranslation()

    const openTerms = () => {
        setOpen(true)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [event.target.name]: event.target.checked })
    }

    const { age, terms } = fields
    const error = [age, terms].filter((v) => v).length !== 2
    return (
        <div className={classes.container}>
            <div className={classes.walletsModal}>
                <div className={classes.modalHeader}>
                    <LogoIcon />
                </div>
                <div className={classes.content}>
                    <div className={classes.info}>
                        <NavLink
                            className={classes.backBtn}
                            to={'/productpage'}
                        >
                            <ArrowBackIcon />
                            <Typography variant="h5">{t('goBack')}</Typography>
                        </NavLink>
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
                            className={classes.description}
                            variant="h6"
                        >
                            {t('cnWithOneOfProviders')}{' '}
                            <span className={classes.walletInfo}>
                                {t('whatIsWallet')}
                            </span>
                        </Typography>
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
                            wallet={wallets[0]}
                            openTerms={openTerms}
                        />
                    </div>
                </div>
            </div>
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
                            disabled={error}
                            className={classes.termsModalBtn}
                            label={t('goToDownloadPage')}
                        />
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Wallets
