import React, { useState, useCallback } from 'react'

type ErrorType = {
    title: string
    message: string
}

export type APIErrorContextProps = {
    error: ErrorType | null
    addError: (title: string, message: string) => void
    removeError: () => void
}

export const APIErrorContext = React.createContext<APIErrorContextProps>({
    error: null,
    addError: () => undefined,
    removeError: () => undefined,
})

export default function APIErrorProvider({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    const [error, setError] = useState<ErrorType | null>(null)

    const removeError = () => setError(null)

    const addError = (title: string, message: string) =>
        setError({ title, message })

    const contextValue = {
        error,
        addError: useCallback((title, message) => addError(title, message), []),
        removeError: useCallback(() => removeError(), []),
    }

    return (
        <APIErrorContext.Provider value={contextValue}>
            {children}
        </APIErrorContext.Provider>
    )
}
