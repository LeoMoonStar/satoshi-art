import React, { useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Modal, Typography } from '@material-ui/core'
import Button from 'shared/Button'
import { useWallets } from 'hooks/useWallets'
import { shortAddress } from 'utils/helpers'
import useStyles from './ConnectWallet.style'

const ConnectButton = (): JSX.Element => {
    const classes = useStyles()

    const [open, setOpen] = useState<boolean>(false)

    const { activate, account } = useWeb3React<Web3Provider>()

    //@TODO: fix window type
    const hasInjectedProvider = (window as any).ethereum

    const wallets = useWallets()

    const connectWallet = async () => {
        if (!hasInjectedProvider) {
            handleOpenModal()
        }
        const connector = wallets[0].createConnector()
        await activate(connector)
    }

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    const userAddress = useMemo(() => {
        if (!!account) {
            return shortAddress(account, 10)
        }
    }, [account])

    return (
        <div>
            <Modal open={open} onClose={handleCloseModal}>
                <div className={classes.modalContainer}>
                    <Typography>
                        <a
                            href={wallets[0].href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Install Metamask
                        </a>
                    </Typography>
                </div>
            </Modal>
            <Button
                className={classes.connectWalletBtn}
                onClick={connectWallet}
                label={!!account ? userAddress : 'Connect Wallet'}
            />
        </div>
    )
}

export default ConnectButton
