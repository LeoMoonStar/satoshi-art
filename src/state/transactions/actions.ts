import { createAction } from '@reduxjs/toolkit'
import { TransactionReceipt } from '@ethersproject/providers'

export interface TransactionsListItem {
    chainId: number
    hash: string
    receipt?: TransactionReceipt
    tokenId?: string
    dropped?: boolean
}

export const addTransaction = createAction<TransactionsListItem>(
    'transactions/addTransaction'
)

export const finalizeTransaction = createAction<{
    chainId: number
    hash: string
    receipt: any
    dropped: boolean
    tokenId: any
}>('transactions/finalizeTransaction')
