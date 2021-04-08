import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { WalletInfo } from 'hooks/useWallets'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { changeLoggedWith } from 'state/app/actions'
import { permittedToUseWalletSelector } from 'state/app/selectors'
import Button from 'shared/Button'
// import { checkUser } from 'api/user'

import useStyles from './WalletOption.style'

type OptionProps = {
    wallet: WalletInfo
    openTerms: () => void
    onRequestError: () => void
}

const WalletOption: React.FC<OptionProps> = ({
    wallet,
    openTerms,
    onRequestError,
}) => {
    const classes = useStyles()
    const history = useHistory()
    const [isConnectTriggered, setIsConnectTriggered] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    const isPermittedToUseWallet = useSelector<AppState, boolean>(
        permittedToUseWalletSelector
    )
    const { activate, account } = useWeb3React<Web3Provider>()

    //@TODO: fix window type
    const hasInjectedProvider = (window as any).ethereum

    const connectWallet = async () => {
        setIsConnectTriggered(true)
        const connector = wallet.createConnector()
        await activate(connector, onRequestError)
        dispatch(changeLoggedWith(wallet.name))
        setIsConnectTriggered(false)

        if (isPermittedToUseWallet) {
            history.push('/')
        }
    }

    useEffect(() => {
        // async function checkIfUserRegistred(account: string) {
        //     await checkUser(account).catch(() => openTerms())
        // }

        if (account && isConnectTriggered && !isPermittedToUseWallet) {
            openTerms()
        }
    }, [account, isConnectTriggered, isPermittedToUseWallet, openTerms])

    const Logo = wallet.logo

    const connectOption = (
        <Button className={classes.connectBtn} onClick={connectWallet}>
            <Logo className={classes.iconWrapper} />
            {!hasInjectedProvider && wallet.name === 'Metamask' ? (
                <span>Install Metamask</span>
            ) : (
                <span>{wallet.name}</span>
            )}
        </Button>
    )

    if (wallet.href && wallet.name === 'Metamask' && !hasInjectedProvider) {
        return (
            <a
                href={wallet.href}
                target="_blank"
                rel="noreferrer"
                className={classes.externalLink}
            >
                {connectOption}
            </a>
        )
    }

    return connectOption
}

export default WalletOption
