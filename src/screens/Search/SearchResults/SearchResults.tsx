import React from 'react'
import SearchHeader from '../SearchHeader'
import Works from 'shared/Works'

import useStyles from './SearchResults.style'

export default function SearchResults(): JSX.Element {
    const classes = useStyles()
    return (
        <div>
            <SearchHeader />
            <div className={classes.container}>
                <Works />
            </div>
        </div>
    )
}
