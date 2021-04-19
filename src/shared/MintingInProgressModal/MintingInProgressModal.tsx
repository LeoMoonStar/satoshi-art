import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { useCurrentNetwork } from 'hooks/useCurrentNetwork'
import Modal from 'shared/Modal'
import Button from 'shared/Button'
import useStyles from './MintingInProgressModal.style'
import { transactionInMintingProcessSelector } from 'state/app/selectors'
import { updateTransactionInMintingProcess } from 'state/app/actions'

const CreateForm = (): JSX.Element => {
    const classes = useStyles()
    const [isOpen, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const transactionInMintingProcess = useSelector(
        transactionInMintingProcessSelector
    )
    const [transactionHash, setTransactionHash] = useState<string | null>(null)
    const { explorer, id } = useCurrentNetwork()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(updateTransactionInMintingProcess(null))
    }, [id])

    useEffect(() => {
        if (transactionInMintingProcess) {
            setOpen(true)
            setTransactionHash(transactionInMintingProcess)
            dispatch(updateTransactionInMintingProcess(null))
        }
    }, [transactionInMintingProcess])

    const handleClose = () => {
        setOpen(false)
        dispatch(updateTransactionInMintingProcess(null))
    }

    const link = `${explorer}/tx/${transactionHash}`

    return (
        <Modal onClose={handleClose} open={isOpen}>
            <div className={classes.container}>
                <div className={classes.title}>
                    {t('yourTokenIsBeingMinted')}
                </div>
                <div className={classes.content}>
                    {t('miningProgressModalContent')}
                    <a href={link} target="_blank" rel="noreferrer">
                        {link}
                    </a>
                </div>
                <Button
                    className={classes.actionButton}
                    onClick={() => setOpen(false)}
                    variantCustom="action"
                >
                    {t('proceed')}
                </Button>
            </div>
        </Modal>
    )
}

export default CreateForm
