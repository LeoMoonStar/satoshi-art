import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'

import Layout from 'shared/Layout'
import { LeftArrowIcon } from 'shared/icons'

import useStyles from './CreateCollectible.style'
import CreateForm from './CreateForm'
import Preview from './Preview'

const CreateCollectible = (): JSX.Element => {
    const classes = useStyles()
    const history = useHistory()
    const { type } = useParams<{ type: string }>()

    const [collectible, setCollectible] = React.useState({
        file: '',
        settings: {
            onSale: true,
            price: false,
            unlock: false,
        },
        collection: '',
        fields: {
            name: '',
            description: '',
            royalties: '',
            properties: [
                {
                    name: '',
                    value: '',
                },
            ],
        },
    })

    const handleChange = (field: string, value: string | boolean) => {
        setCollectible({
            ...collectible,
            [JSON.stringify(field)]: value,
        })
        console.log(collectible)
    }

    const handleGoBack = () => history.goBack()

    return (
        <Layout>
            <div className={classes.container}>
                <div>
                    <Button onClick={handleGoBack} className={classes.goBack}>
                        <LeftArrowIcon /> Manage collectible type
                    </Button>
                    <div className={classes.title}>
                        Create {type} collectible
                    </div>
                </div>
                <div className={classes.form}>
                    <CreateForm
                        onChange={handleChange}
                        collectible={collectible}
                    />
                    <Preview />
                </div>
            </div>
        </Layout>
    )
}

export default CreateCollectible
