import React from 'react'

import Layout from 'shared/Layout'

import DropOfTheDay from './DropOfTheDay'
import TopSellersAndBuyers from './TopSellersAndBuyers'
import Tops from './Tops'
// import Iterators from './Iterators'

import PopularWorks from './PopularWorks'
import Intro from './Intro'
// import { useWeb3React } from '@web3-react/core'
import useWalletTokens from './useWalletTokens'

function Home(): JSX.Element {
    // const { account } = useWeb3React()
    // const parsed = JSON.stringify(account)
    // console.log('parsseeed', parsed)
    useWalletTokens()

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
            <PopularWorks />
        </Layout>
    )
}

export default Home
