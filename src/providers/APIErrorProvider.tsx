import React, { useState, useCallback, useMemo } from 'react'

type ErrorType = {
    title: string
    message?: string
}

export type APIErrorContextProps = {
    error: ErrorType | null
    setError: (title: string, message?: string) => void
    removeError: () => void
}

export const APIErrorContext = React.createContext<APIErrorContextProps>({
    error: null,
    setError: () => undefined,
    removeError: () => undefined,
})

export default function APIErrorProvider({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    const [error, updateError] = useState<ErrorType | null>(null)

    const setError = useCallback(
        (title: string, message?: string) => updateError({ title, message }),
        []
    )

    const removeError = useCallback(() => updateError(null), [])

    const contextValue = useMemo(() => {
        return {
            error,
            setError,
            removeError,
        }
    }, [error, setError, removeError])

    return (
        <APIErrorContext.Provider value={contextValue}>
            {children}
        </APIErrorContext.Provider>
    )
}
