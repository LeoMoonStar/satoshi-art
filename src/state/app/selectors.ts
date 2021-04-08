import { AppState } from '../'

export const getWhiteListedStatus = (state: AppState): boolean => {
    return state.app.isWhitelisted
}
