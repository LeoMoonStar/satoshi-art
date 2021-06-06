import { useContext } from 'react';
import { APIErrorContext, APIErrorContextProps } from '../components/provider/APIErrorProvider';

export function useAPIError(): APIErrorContextProps {
  const { error, setError, removeError } = useContext(APIErrorContext);
  return { error, setError, removeError };
}
