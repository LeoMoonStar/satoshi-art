import { createAction } from '@reduxjs/toolkit'

export const setLoggedWith = createAction<string>('app/setLoggedWith')
