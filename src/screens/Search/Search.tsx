import React, { useState, useEffect } from 'react'

import Layout from 'shared/Layout'
import SearchResults from './SearchResults'
import { useWeb3React } from '@web3-react/core'
import { getTokens, Token } from 'api/tokens'

function Search(): JSX.Element {
    const [testTokens, setTestTokens] = useState<Token[]>([])
    const [tokens, setTokens] = useState<Token[]>([])
    const { account } = useWeb3React()
    useEffect(() => {
        if (!account) {
            return
        }

        getTokens({ sort: 'published_at:desc' }).then((tokens) =>
            setTokens(tokens)
        )

        getTokens({ walletHash: account }).then((res) => {
            setTestTokens(res)
        })
    }, [account])
    return (
        <Layout>
            <SearchResults testTokens={testTokens} tokens={tokens} />
        </Layout>
    )
}

export default Search
