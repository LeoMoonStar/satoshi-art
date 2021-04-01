import { createReducer } from '@reduxjs/toolkit'
import { changeLoggedWith, updateBlockNumber } from './actions'

export interface AppState {
    loggedInWith: string
    blockNumber?: number
}

const initialState: AppState = {
    loggedInWith: '',
    blockNumber: undefined,
}

export default createReducer(initialState, (app) => {
    app.addCase(changeLoggedWith, (state, action) => {
        state.loggedInWith = action.payload
    }).addCase(updateBlockNumber, (state, action) => {
        state.blockNumber = action.payload
    })
})
