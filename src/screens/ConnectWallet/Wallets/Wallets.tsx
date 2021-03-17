import React from 'react'
import { NavLink } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Typography, Divider } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { ReactComponent as LogoIcon } from 'shared/icons/logoHeader.svg'

import useStyles from './Wallets.style'
import WalletOption from '../WalletOption'
import { useWallets } from 'hooks/useWallets'

function Wallets(): JSX.Element {
    const classes = useStyles()
    const wallets = useWallets()
    const { t } = useTranslation()

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
                        <WalletOption wallet={wallets[0]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallets
