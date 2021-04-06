import { useEffect, useMemo } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import { finalizeTransaction, TokenType, TransactionsListItem } from './actions'
import { useBlockNumber } from 'state/app/hooks'
import { useEthersUtils } from 'utils/erc721'
import { use1155EthersUtils } from 'utils/erc1155'

// specialization of TransactionsListItem
export type PendingTransaction = TransactionsListItem & {
    receipt: undefined
}

export function useTransactionsUpdater(): void {
    const { chainId, library } = useWeb3React<Web3Provider>()
    const dispatch = useDispatch()
    const blockNumber = useBlockNumber()
    const ethersUtils = useEthersUtils()
    const ethers1155Utils = use1155EthersUtils()
    const transactions = useSelector<
        AppState,
        Record<string, TransactionsListItem> | undefined
    >((state: AppState) =>
        chainId ? state.transactions.transactions[chainId] : undefined
    )
    const pendingTransactions = usePendingTransactions()

    useEffect(() => {
        ;(async () => {
            if (!library || !chainId || !(pendingTransactions.length > 0)) {
                return
            }
            for (const tx of pendingTransactions) {
                library
                    .getTransactionReceipt(tx.hash)
                    .then(async (receipt) => {
                        if (receipt === null) {
                            //transaction still in queue for mining
                            if (
                                (await library.getTransaction(tx.hash)) === null
                            ) {
                                //transaction was dropped by user, he speeds up tx for example
                                dispatch(
                                    finalizeTransaction({
                                        tokenId: null,
                                        chainId,
                                        hash: tx.hash,
                                        receipt: {
                                            status: 0,
                                        },
                                        dropped: true,
                                    })
                                )
                            }
                        } else {
                            //transaction was mined
                            if (!transactions) {
                                return
                            }
                            const tokenType = transactions[tx.hash].type
                            //logs contains 2 events 'Transver' and 'Approval', each contains tokenId
                            //@TODO: fix hardcode
                            const logFromReceipt =
                                tokenType === TokenType.SINGLE
                                    ? ethersUtils.parseLog(receipt.logs[0])
                                    : ethers1155Utils.parseLog(receipt.logs[0])
                            const tokenId =
                                tokenType === TokenType.SINGLE
                                    ? logFromReceipt.args['tokenId'].toString()
                                    : logFromReceipt.args['id'].toString()
                            const copiesNumber =
                                tokenType === TokenType.MULTIPLE
                                    ? logFromReceipt.args['value'].toString()
                                    : null
                            dispatch(
                                finalizeTransaction({
                                    tokenId,
                                    copiesNumber,
                                    chainId,
                                    hash: tx.hash,
                                    receipt: {
                                        ...receipt,
                                        gasUsed: receipt.gasUsed.toString(),
                                        cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
                                    },
                                    dropped: false,
                                })
                            )
                        }
                    })
                    .catch((err: any) => {
                        console.error(
                            'something went wrong with receiving tx receipt:',
                            tx,
                            err
                        )
                    })
            }
        })()
    }, [
        blockNumber,
        chainId,
        dispatch,
        ethers1155Utils,
        ethersUtils,
        library,
        pendingTransactions,
        transactions,
    ])
}

export function useTransactions(): TransactionsListItem[] {
    const { chainId } = useWeb3React()
    const transactions = useSelector<
        AppState,
        Record<string, TransactionsListItem> | undefined
    >((state: AppState) =>
        chainId ? state.transactions.transactions[chainId] : undefined
    )

    return useMemo(() => {
        if (!transactions) return []
        return Object.values(transactions)
    }, [transactions])
}

export function usePendingTransactions(): PendingTransaction[] {
    const transactions = useTransactions()
    return useMemo(() => {
        return transactions.filter(
            (tx): tx is PendingTransaction => !tx.receipt
        ) // pending transactions don't have receipt
    }, [transactions])
}
