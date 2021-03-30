import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { NavLink } from 'react-router-dom'
import Button from 'shared/Button'
import useStyles from './ConnectButton.style'

const ConnectButton = (): JSX.Element | null => {
    const classes = useStyles()

    const { account } = useWeb3React<Web3Provider>()

    if (account) {
        return null
    }

    return (
        <div>
            <NavLink to={'/connect'} className={classes.linkStyle}>
                <Button
                    className={classes.connectWalletBtn}
                    label={'Connect Wallet'}
                />
            </NavLink>
        </div>
    )
}

export default ConnectButton
