import { createReducer } from '@reduxjs/toolkit'
import { setLoggedWith } from './actions'

export interface AppState {
    loggedInWith: string
}

const initialState: AppState = {
    loggedInWith: '',
}

export default createReducer(initialState, (app) => {
    app.addCase(setLoggedWith, (state, action) => {
        state.loggedInWith = action.payload
    })
})
