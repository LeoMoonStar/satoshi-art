import React from 'react'
import Layout from 'shared/Layout'
import PageDetails from 'shared/PageDetails'
import ArtistWorks from './ArtistWorks'
import { useParams } from 'react-router-dom'
import useWalletTokens from './../../hooks/useWalletTokens'
// import { profile } from 'console'

const profileTest = {
    title: 'Artist',
    name: 'Igor',
    hash: '',
    dscr: 'Good collections. Stay tuned for new NFTs',
    url: 'twitter.com/',
}

export default function Artist(): JSX.Element {
    const testTokens = useWalletTokens()

    const { id } = useParams<{ id: string }>()
    return (
        <Layout>
            <PageDetails
                profile={{
                    ...profileTest,
                    hash: id,
                }}
            />
            <ArtistWorks tokens={testTokens} />
        </Layout>
    )
}
