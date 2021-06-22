import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { AuthState } from './type';

export function useUserProfile(): AuthState {
  return useSelector((state: AppState) => state.auth);
}
