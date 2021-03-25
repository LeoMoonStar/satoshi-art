import React from 'react'
import { Button, IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Works from 'shared/Works'
import { FilterIcon } from 'shared/icons'

import useStyles from './PopularWorks.style'

const categories = ['creator', 'collectible', 'collection']

export default function PopularWorks(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <h3 className={classes.title}>{t('inTheWorldNowTogether')}</h3>
            <h2 className={classes.subTitle}>{t('hereForYou')}</h2>
            <div className={classes.filters}>
                <nav className={classes.navigation}>
                    {categories.map((category) => (
                        <Button key={category}>{t('category')}</Button>
                    ))}
                </nav>
                <IconButton className={classes.filterButton}>
                    <FilterIcon />
                </IconButton>
            </div>
            <Works borderWidth={0} isLoading={false} variant="rounded" />
        </section>
    )
}
