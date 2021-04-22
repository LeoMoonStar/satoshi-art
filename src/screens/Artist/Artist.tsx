import React from 'react'
import Layout from 'shared/Layout'
import PageDetails from 'shared/PageDetails'
import ArtistWorks from './ArtistWorks'
import { useParams } from 'react-router-dom'
import useWalletTokens from './../../hooks/useWalletTokens'

// const profile = {
//     title: 'Artist',
//     name: 'Fimbim',
//     hash: '0x83fa662610b20...7495',
//     dscr: 'Relax Pepe collections. Stay tuned for new NFTs',
//     url: 'fimbim.com.br',
// }

export default function Artist(): JSX.Element {
    const testTokens = useWalletTokens()

    const { id } = useParams<{ id: string }>()
    const profileTest = {
        title: 'Artist',
        name: 'Igor',
        hash: id,
        dscr: 'Good collections. Stay tuned for new NFTs',
        url: 'twitter.com/',
    }
    return (
        <Layout>
            <PageDetails profile={profileTest} />
            <ArtistWorks tokens={testTokens} />
        </Layout>
    )
}
