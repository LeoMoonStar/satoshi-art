import React from 'react'
import SearchHeader from '../SearchHeader'
import Works from 'shared/Works'

import useStyles from './SearchResults.style'
import { Token } from 'api/tokens'

type SearchResultsProps = {
    tokens?: Token[]
}

export default function SearchResults({
    tokens = [],
}: SearchResultsProps): JSX.Element {
    const classes = useStyles()
    return (
        <div>
            <SearchHeader />
            <div className={classes.container}>
                <Works isLoading={false} tokens={tokens} />
            </div>
        </div>
    )
}
