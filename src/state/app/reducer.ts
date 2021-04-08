import { createReducer } from '@reduxjs/toolkit'
import {
    changeLoggedWith,
    updateBlockNumber,
    changeWhitelistedStatus,
} from './actions'

export interface AppState {
    loggedInWith: string
    blockNumber?: number
    isWhitelisted: boolean
}

const initialState: AppState = {
    loggedInWith: '',
    blockNumber: undefined,
    isWhitelisted: false,
}

export default createReducer(initialState, (app) => {
    app.addCase(changeLoggedWith, (state, action) => {
        state.loggedInWith = action.payload
    })
        .addCase(updateBlockNumber, (state, action) => {
            state.blockNumber = action.payload
        })
        .addCase(changeWhitelistedStatus, (state, action) => {
            state.isWhitelisted = action.payload
        })
})
