import { Token } from 'api/tokens'
import { useMemo } from 'react'

export const isTokenOwned = (id: string | number, tokens: Token[]): boolean => {
    return tokens.some((token: Token) => token.id === id)
}

export const useIsTokenOwned = (
    id: string | number,
    tokens: Token[]
): boolean => {
    const isOwned = useMemo(() => {
        return tokens.some((token: Token) => token.id === id)
    }, [id, tokens])

    return isOwned
}
