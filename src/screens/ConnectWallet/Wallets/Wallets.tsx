import React from 'react'

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
                        <span>Go Back</span>

                        <span>Connect your wallet</span>

                        <span>
                            Connect with one of available wallet providers or
                            create a new wallet.
                        </span>
                        <span>What is wallet?</span>

                        <span>
                            We do not own your private keys and cannot access
                            your funds without your confirmation.
                        </span>
                    </div>
                    <div className={classes.connectors}>
                        <Button
                            label={'Fortmatic'}
                            className={classes.connectBtn}
                        />
                        <Button
                            label={'WalletConnect'}
                            className={classes.connectBtn}
                        />
                        <Button
                            label={'Coinbase Wallet'}
                            className={classes.connectBtn}
                        />
                        <Button
                            label={'MyEtherWallet'}
                            className={classes.connectBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallets
