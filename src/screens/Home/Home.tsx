import React from 'react'

import Layout from 'shared/Layout'
import Button from 'shared/Button'

import nftImg from 'shared/images/NFT.png'
import escalasImg from 'shared/images/escalas.png'

import Tops from './Tops'

import useStyles from './Home.style'

const tops = [
    {
        header: 'Top Sellers',
        label: 'sellers',
        items: [
            {
                label: 'Item 1',
                value: 'item1',
            },
            {
                label: 'Item 2',
                value: 'item2',
            },
            {
                label: 'Item 3',
                value: 'item3',
            },
        ],
    },
    {
        header: 'Top Buyers',
        label: 'buyers',
        items: [
            {
                label: 'Item 1',
                value: 'item1',
            },
            {
                label: 'Item 2',
                value: 'item2',
            },
            {
                label: 'Item 3',
                value: 'item3',
            },
        ],
    },
]

function Home(): JSX.Element {
    const classes = useStyles()

    return (
        <Layout>
            <div className={classes.container}>
                <div className={classes.explore}>
                    <div className={classes.exploreBlock}>
                        <div>
                            <img src={nftImg} />
                        </div>
                        <div>
                            <Button
                                label={'Explore collections'}
                                className={classes.exploreButton}
                            />
                        </div>
                    </div>
                    <div className={classes.exploreBlock}>
                        <img src={escalasImg} />
                    </div>
                </div>
                <Tops topsItems={tops} />
            </div>
        </Layout>
    )
}

export default Home
