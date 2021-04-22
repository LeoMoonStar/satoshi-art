import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { getTokens } from 'api/tokens'
import { Token } from 'api/tokens'

const useWalletTokens = (): any => {
    const [tokens, setTokens] = useState<Token[]>([])
    const { account } = useWeb3React()

    useEffect(() => {
        if (!account) {
            return
        }

        getTokens({
            walletHash: account,
        })
            .then((res) => {
                setTokens(res)
            })
            .catch((err) => {
                console.error('Error in getting tokens - useWalletTokens', err)
            })
    }, [account])

    console.log('Tokens', tokens)
    // console.log('walletHash', account)

    // Arts = tokens, sorted by wallet
    return tokens
}

export default useWalletTokens
