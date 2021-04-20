import React from 'react'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { LeftArrowIcon } from 'shared/icons'

import Layout from 'shared/Layout'
import Form from './Form'
import useStyles from './EditProfile.style'

export default function EditProfile(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const history = useHistory()

    const handleGoBack = () => history.goBack()

    return (
        <Layout>
            <div className={classes.container}>
                <div>
                    <Button className={classes.goBack} onClick={handleGoBack}>
                        <LeftArrowIcon /> {t('goBack')}
                    </Button>
                    <h1 className={classes.title}>{t('editProfile')}</h1>
                </div>
                <Form />
            </div>
        </Layout>
    )
}
