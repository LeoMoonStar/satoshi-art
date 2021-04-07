import React from 'react'
import { Button } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'

import Layout from 'shared/Layout'
import { LeftArrowIcon } from 'shared/icons'

import useStyles from './CreateCollectible.style'
import CreateForm from './CreateForm'

const CreateCollectible = (): JSX.Element => {
    const classes = useStyles()
    const history = useHistory<{ isAllowedGoBack: boolean }>()
    const { type } = useParams<{ type: string }>()

    const handleGoBack = () => {
        if (history.location.state?.isAllowedGoBack) {
            history.goBack()
            return
        }

        history.push('/create-collectible')
    }
    const isSingle = type === 'single'

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
                <CreateForm isSingle={isSingle} />
            </div>
        </Layout>
    )
}

export default CreateCollectible
