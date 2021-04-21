import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { getTokens } from 'api/tokens'
import { Token } from 'api/tokens'

const useWalletTokens = (): any => {
    const [tokens, setTokens] = useState<Token[]>([])
    const { account } = useWeb3React()
    const walletHash = JSON.stringify(account)

    useEffect(() => {
        getTokens({
            sort: 'published_at:desc',
            walletHash,
        })
            .then((res) => {
                setTokens(res)
            })
            .catch((err) => {
                console.error('Error in getting tokens - useWalletTokens', err)
            })
    }, [walletHash])

    console.log('Tokens', tokens)
    console.log('walletHash', walletHash)

    // Arts = tokens, sorted by wallet
    return tokens
}

export default useWalletTokens
