import { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { getTokens } from 'api/tokens'
import { Token } from 'api/tokens'
import { APIErrorContext } from 'providers/APIErrorProvider'
import { useTranslation } from 'react-i18next'

const useWalletTokens = (): any => {
    const [tokens, setTokens] = useState<Token[]>([])
    const { account } = useWeb3React()
    const { setError } = useContext(APIErrorContext)
    const { t } = useTranslation()

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
                setError(
                    t('tokensLoadingFailed'),
                    JSON.stringify(err.data, null, 2)
                )
            })
    }, [account, setError, t])

    // TODO sotred (params) - return sortedTokens

    return tokens
}

export default useWalletTokens
