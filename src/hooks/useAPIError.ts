import { useContext } from 'react'
import {
    APIErrorContext,
    APIErrorContextProps,
} from 'providers/APIErrorProvider'

export function useAPIError(): APIErrorContextProps {
    const { error, addError, removeError } = useContext(APIErrorContext)
    return { error, addError, removeError }
}
