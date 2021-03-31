import React from 'react'

import Layout from 'shared/Layout'

import DropOfTheDay from './DropOfTheDay'
import TopSellersAndBuyers from './TopSellersAndBuyers'
import PopularWorks from './PopularWorks'
import Intro from './Intro'
import Tops from './Tops'
import Iterators from './Iterators'

function Home(): JSX.Element {
    return (
        <Layout headerVariant="full" justifyTopRowFooter="center">
            <Intro />
            <DropOfTheDay />
            <Iterators />
            <TopSellersAndBuyers />
            <Tops />
            <PopularWorks />
        </Layout>
    )
}

export default Home
