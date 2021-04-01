import { createAction } from '@reduxjs/toolkit'

export const changeLoggedWith = createAction<string>('app/changeLoggedWith')
export const updateBlockNumber = createAction<number>('app/updateBlockNumber')
