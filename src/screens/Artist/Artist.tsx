import React from 'react'
import Layout from 'shared/Layout'
import PageDetails from 'shared/PageDetails'
import ArtistWorks from './ArtistWorks'

const profle = {
    title: 'Artist',
    name: 'Fimbim',
    hash: '0x83fa662610b20...7495',
    dscr: 'Relax Pepe collections. Stay tuned for new NFTs',
    url: 'fimbim.com.br',
}

export default function Artist(): JSX.Element {
    return (
        <Layout>
            <PageDetails profile={profle} />
            <ArtistWorks />
        </Layout>
    )
}
