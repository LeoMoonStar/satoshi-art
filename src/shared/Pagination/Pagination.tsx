import React from 'react'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'

import { DoubleArrowLeft } from 'shared/icons'

import useStyles from './Pagination.style'

type PaginationProps = {
    className?: string
}

export default function Pagination({
    className,
}: PaginationProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <ul className={cx(classes.container, className)}>
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
