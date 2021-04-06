import React from 'react'
import Layout from 'shared/Layout'

import PageDetails from 'shared/PageDetails/PageDetails'
import CollectionWorks from './CollectionWorks'

const profle = {
    title: 'Collection',
    name: 'Jinglebe',
    hash: '0x83fa662610b20...7495',
    dscr:
        'Own your melody with the first NFT Jingle in the world.' +
        'For every feeling there is a melody and every moment has a sound.' +
        '100 handmade Jingles with A.I. generated faces embody your Coverart. You´re art and so is this. ',
    url: 'jinglebe.com',
}

export default function Collection(): JSX.Element {
    return (
        <Layout>
            <PageDetails profile={profle} center />
            <CollectionWorks />
        </Layout>
    )
}
