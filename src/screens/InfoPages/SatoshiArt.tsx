import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from 'shared/Layout'

import { LeftArrowIcon } from 'shared/icons'

import useStyles from './InfoPages.style'

export default function SatoshiArt(): JSX.Element {
    const history = useHistory()
    const classes = useStyles()

    const { t } = useTranslation()
    const handleGoBack = () => history.push('/')

    return (
        <Layout>
            <div className={classes.container}>
                <Button className={classes.backBtn} onClick={handleGoBack}>
                    <LeftArrowIcon /> {t('backToHomePage')}
                </Button>
                <div className={classes.contentContainer}>
                    <div>
                        <h2>{t('s-art-intro1')}</h2>
                        <p>{t('s-art-p1')}</p>
                        <p>{t('s-art-p2')}</p>

                        <h2>{t('s-art-intro2')}</h2>
                        <p style={{ lineHeight: '1.85em' }}>{t('s-art-p3')}</p>

                        <h2>{t('s-art-intro3')}</h2>
                        <p>{t('s-art-p4')}</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
