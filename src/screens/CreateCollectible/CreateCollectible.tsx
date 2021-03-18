import React from 'react'
import { Button } from '@material-ui/core'
import { LeftArrowIcon } from 'shared/icons'
import multipleCollectible from 'shared/images/multipleCollectible.svg'
import singleCollectible from 'shared/images/singleCollectible.svg'

import Layout from 'shared/Layout'
import useStyles from './CreateCollectible.style'

function Product(): JSX.Element {
    const classes = useStyles()
    return (
        <Layout>
            <div className={classes.container}>
                <div className={classes.contentCard}>
                    <Button className={classes.goBack}>
                        <LeftArrowIcon /> Go Back
                    </Button>
                    <h1 className={classes.title}>Create collectible</h1>

                    <div className={classes.content}>
                        Choose “Single” if you want your collectible to be one
                        of a kind or “Multiple” if you want to sell one
                        collectible multiple times
                    </div>

                    <div className={classes.additionalInfo}>
                        We do not own your private keys and cannot access your
                        funds without your confirmation.
                    </div>
                </div>
                <div className={classes.cards}>
                    <button type="button" className={classes.card}>
                        <img src={singleCollectible} alt="" />
                        <h3 className={classes.cardTitle}>Single</h3>
                    </button>

                    <button type="button" className={classes.card}>
                        <img src={multipleCollectible} alt="" />
                        <h3 className={classes.cardTitle}>Multiple</h3>
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Product
