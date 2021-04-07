import { createReducer } from '@reduxjs/toolkit'
import { changeLoggedWith, changeWhitelistedStatus } from './actions'

export interface AppState {
    loggedInWith: string
    isWhitelisted: boolean
}

const initialState: AppState = {
    loggedInWith: '',
    isWhitelisted: false,
}

export default createReducer(initialState, (app) => {
    app.addCase(changeLoggedWith, (state, action) => {
        state.loggedInWith = action.payload
    }).addCase(changeWhitelistedStatus, (state, action) => {
        state.isWhitelisted = action.payload
    })
})
