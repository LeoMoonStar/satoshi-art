import React from 'react'
import { useTranslation } from 'react-i18next'

import TopList from './TopList'

import useStyles from './TopSellersAndBuyers.style'

export default function TopSellersAndBuyers(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <TopList titleColor="#FF0099" title={t('topSeller')} />
            <TopList titleColor="#6A2FE7" title={t('topBuyers')} />
        </div>
    )
}
