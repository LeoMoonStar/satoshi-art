import { createReducer } from '@reduxjs/toolkit'

import {
    addTransaction,
    finalizeTransaction,
    TransactionsListItem,
} from './actions'

export interface TransactionsState {
    transactions: {
        [chainId: number]: {
            [txHash: string]: TransactionsListItem
        }
    }
}

const initialState: TransactionsState = {
    transactions: {},
}

export default createReducer(initialState, (transactions) => {
    transactions
        .addCase(addTransaction, (state, action) => {
            state.transactions[action.payload.chainId] = {
                ...(state.transactions[action.payload.chainId] || {}),
                [action.payload.hash]: action.payload,
            }
        })
        .addCase(finalizeTransaction, (state, action) => {
            const { chainId, hash, receipt, tokenId } = action.payload
            state.transactions[chainId][hash] = {
                ...state.transactions[chainId][hash],
                receipt,
                tokenId,
            }
        })
})
