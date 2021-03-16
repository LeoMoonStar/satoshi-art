import React from 'react'

import Footer from 'shared/Layout/Footer'
import Wallets from './Wallets'

import useStyles from './ConnectWallet.style'

function ConnectWallet(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Wallets />
            </div>
            <footer className={classes.footer}>
                <Footer />
            </footer>
        </div>
    )
}

export default ConnectWallet
