import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { NavLink } from 'react-router-dom'
import Button from 'shared/Button'
import { shortAddress } from 'utils/helpers'
import useStyles from './ConnectButton.style'

const ConnectButton = (): JSX.Element => {
    const classes = useStyles()

    const { account } = useWeb3React<Web3Provider>()
    const userAddress = useMemo(() => {
        if (!!account) {
            return shortAddress(account, 10)
        }
    }, [account])

    return (
        <div>
            {!!account ? (
                <Button
                    className={classes.connectWalletBtn}
                    label={userAddress}
                />
            ) : (
                <NavLink to={'/connect'} className={classes.linkStyle}>
                    <Button
                        className={classes.connectWalletBtn}
                        label={'Connect Wallet'}
                    />
                </NavLink>
            )}
        </div>
    )
}

export default ConnectButton
