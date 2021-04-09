import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useCurrentNetwork } from 'hooks/useCurrentNetwork'
import Modal from 'shared/Modal'
import Button from 'shared/Button'
import { useTransactions } from 'state/transactions/hooks'
import { TransactionsListItem } from 'state/transactions/actions'
import useStyles from './MintingInProgressModal.style'

const CreateForm = (): JSX.Element => {
    const classes = useStyles()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [
        newTransaction,
        setNewTransaction,
    ] = useState<TransactionsListItem | null>(null)
    const prevTransactionsRef = useRef<TransactionsListItem[]>([])
    const transactions: TransactionsListItem[] = useTransactions()
    const { explorer, id } = useCurrentNetwork()
    const { t } = useTranslation()

    useEffect(() => {
        prevTransactionsRef.current = []
    }, [id])

    useEffect(() => {
        if (
            prevTransactionsRef.current.length &&
            transactions.length !== prevTransactionsRef.current.length
        ) {
            setOpen(true)
            setNewTransaction(transactions[transactions.length - 1])
        }

        prevTransactionsRef.current = transactions
    }, [transactions])

    const handleClose = () => {
        setOpen(false)
        setNewTransaction(null)
    }

    const link = `${explorer}/tx/${newTransaction?.hash}`

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
