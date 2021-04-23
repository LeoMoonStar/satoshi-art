import React, { useState, useEffect } from 'react'

import Layout from 'shared/Layout'
import SearchResults from './SearchResults'
import { getTokens, Token } from 'api/tokens'

function Search(): JSX.Element {
    const [tokens, setTokens] = useState<Token[]>([])

    useEffect(() => {
        getTokens({ sort: 'published_at:desc' }).then((tokens) =>
            setTokens(tokens)
        )
    }, [])
    return (
        <Layout>
            <SearchResults tokens={tokens} />
        </Layout>
    )
}

export default Search
