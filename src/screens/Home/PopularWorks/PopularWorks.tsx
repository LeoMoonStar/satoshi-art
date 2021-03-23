import React from 'react'
import { Button, IconButton } from '@material-ui/core'

import Works from 'shared/Works'
import { FilterIcon } from 'shared/icons'

import useStyles from './PopularWorks.style'

const categories = ['creator', 'collectible', 'collection']

export default function PopularWorks(): JSX.Element {
    const classes = useStyles()

    return (
        <section className={classes.container}>
            <h3 className={classes.title}>in the world, now together</h3>
            <h2 className={classes.subTitle}>Here for you.</h2>
            <div className={classes.filters}>
                <nav className={classes.navigation}>
                    {categories.map((category) => (
                        <Button key={category}>{category}</Button>
                    ))}
                </nav>
                <IconButton className={classes.filterButton}>
                    <FilterIcon />
                </IconButton>
            </div>
            <Works borderWidth={0} variant="rounded" />
        </section>
    )
}
