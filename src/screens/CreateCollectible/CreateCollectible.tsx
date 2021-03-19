import React from 'react'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { LeftArrowIcon } from 'shared/icons'
import multipleCollectible from 'shared/images/multipleCollectible.svg'
import singleCollectible from 'shared/images/singleCollectible.svg'

import Layout from 'shared/Layout'
import useStyles from './CreateCollectible.style'

export default function CreateCollectible(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const history = useHistory()

    const handleGoBack = () => history.goBack()

    return (
        <Layout>
            <div className={classes.container}>
                <div className={classes.contentCard}>
                    <Button className={classes.goBack} onClick={handleGoBack}>
                        <LeftArrowIcon /> {t('goBack')}
                    </Button>
                    <h1 className={classes.title}>{t('createCollectible')}</h1>

                    <div className={classes.content}>
                        {t('chooseSingleIfYouWantYourCollectible')}
                    </div>

                    <div className={classes.additionalInfo}>
                        {t('createCollectibleAdditionalInfo')}
                    </div>
                </div>
                <div className={classes.cards}>
                    <button type="button" className={classes.card}>
                        <img src={singleCollectible} alt="" />
                        <h3 className={classes.cardTitle}>{t('single')}</h3>
                    </button>

                    <button type="button" className={classes.card}>
                        <img src={multipleCollectible} alt="" />
                        <h3 className={classes.cardTitle}>{t('multiple')}</h3>
                    </button>
                </div>
            </div>
        </Layout>
    )
}
