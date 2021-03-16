import React from 'react'
import { NavLink } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Typography, Divider } from '@material-ui/core'

import Button from 'shared/Button'
import { ReactComponent as LogoIcon } from 'shared/icons/logoHeader.svg'

import useStyles from './Wallets.style'

function Wallets(): JSX.Element {
    const classes = useStyles()

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
                            <Typography variant="h5">Go Back</Typography>
                        </NavLink>
                        <Typography
                            className={classes.backBtnText}
                            variant="h2"
                        >
                            Connect your wallet
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
                            Connect with one of available wallet providers or
                            create a new wallet.{' '}
                            <span className={classes.walletInfo}>
                                What is wallet?
                            </span>
                        </Typography>
                        <Typography
                            className={classes.privateRules}
                            variant="h6"
                        >
                            We do not own your private keys and cannot access
                            your funds without your confirmation.
                        </Typography>
                    </div>
                    <div className={classes.connectors}>
                        <Button
                            label={'Metamask'}
                            className={classes.connectBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallets
