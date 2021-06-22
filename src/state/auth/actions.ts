import { createAction } from '@reduxjs/toolkit';
import { AuthState } from './type';
export const fetchProfile = createAction<AuthState>('auth/fetchProfile');
