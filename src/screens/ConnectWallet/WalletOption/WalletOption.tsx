import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useHistory } from 'react-router-dom'
import { WalletInfo } from 'hooks/useWallets'
import Button from 'shared/Button'
import useStyles from './WalletOption.style'

type OptionProps = {
    wallet: WalletInfo
}

const WalletOption: React.FC<OptionProps> = ({ wallet }) => {
    const classes = useStyles()
    const history = useHistory()

    const { activate } = useWeb3React<Web3Provider>()

    //@TODO: fix window type
    const hasInjectedProvider = (window as any).ethereum

    const connectWallet = async () => {
        const connector = wallet.createConnector()
        await activate(connector)
        history.goBack()
    }

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
