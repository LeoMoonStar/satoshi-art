import React from 'react'

import Layout from 'shared/Layout'

import PopularWorks from './PopularWorks'
import Intro from './Intro'

function Home(): JSX.Element {
    return (
        <Layout headerVariant="full">
            <Intro />
            <PopularWorks />
        </Layout>
    )
}

export default Home
