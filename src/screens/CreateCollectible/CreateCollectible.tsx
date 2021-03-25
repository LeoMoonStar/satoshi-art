import React from 'react'
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
                    <CreateForm />
                    <Preview />
                </div>
            </div>
        </Layout>
    )
}

export default CreateCollectible
