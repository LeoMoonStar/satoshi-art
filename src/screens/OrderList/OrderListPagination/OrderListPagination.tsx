import React from 'react'
import { useTranslation } from 'react-i18next'

import { DoubleArrowLeft } from 'shared/icons'

import useStyles from './OrderListPagination.style'

export default function OrderListPagination(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <ul className={classes.container}>
            <li className={classes.first}>
                <button type="button" title={t('first')}>
                    <DoubleArrowLeft />
                </button>
            </li>

            <li>
                <button type="button">1</button>
            </li>

            <li>
                <button type="button">2</button>
            </li>

            <li className={classes.active}>
                <button type="button">3</button>
            </li>

            <li>
                <button type="button">4</button>
            </li>
            <li className={classes.last}>
                <button type="button" title={t('last')}>
                    <DoubleArrowLeft />
                </button>
            </li>
        </ul>
    )
}
