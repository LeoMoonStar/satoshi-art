import React from 'react'
import Layout from 'shared/Layout'

import ArtistDetails from './ArtistDetails'
import ArtistWorks from './ArtistWorks'

export default function Artist(): JSX.Element {
    return (
        <Layout>
            <ArtistDetails />
            <ArtistWorks />
        </Layout>
    )
}
