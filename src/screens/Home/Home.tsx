import React, { useState, useEffect } from 'react'

import Layout from 'shared/Layout'

import DropOfTheDay from './DropOfTheDay'
import TopSellersAndBuyers from './TopSellersAndBuyers'
import Tops from './Tops'
// import Iterators from './Iterators'

import PopularWorks from './PopularWorks'
import Intro from './Intro'
import useWalletTokens from './../../hooks/useWalletTokens'

function Home(): JSX.Element {
    const testTokens = useWalletTokens()

    return (
        <Layout
            headerVariant="full"
            // justifyTopRowFooter="center"
        >
            <Intro />
            <DropOfTheDay />
            {/*<Iterators />*/}
            <TopSellersAndBuyers />
            <Tops />
            <PopularWorks testTokens={testTokens} />
        </Layout>
    )
}

export default Home
