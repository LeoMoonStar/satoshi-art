import { createAction } from '@reduxjs/toolkit'

export const changeLoggedWith = createAction<string>('app/changeLoggedWith')
export const updateBlockNumber = createAction<number>('app/updateBlockNumber')
export const changeWhitelistedStatus = createAction<boolean>(
    'app/changeWhitelistedStatus'
)
export const changePermittedToUseWallet = createAction<boolean>(
    'app/changePermittedToUseWallet'
)
export const disconnectAccount = createAction('app/disconnectAccount')
export const changeRateEthToUsd = createAction<number>('app/changeRateEthToUsd')
