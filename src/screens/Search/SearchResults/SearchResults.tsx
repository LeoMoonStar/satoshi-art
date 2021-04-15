import React from 'react'
import SearchHeader from '../SearchHeader'
import Works from 'shared/Works'

import useStyles from './SearchResults.style'
import preview from 'shared/images/artist/work.jpg'
import { TokenType } from 'state/transactions/actions'

const tokens = Array.from({ length: 24 }, (index) => ({
    id: `id${index}`,
    metadata: {
        type: TokenType.MULTIPLE,
        thumbnail: preview,
        payload: {
            name: 'Fresh Meat #F',
            copiesCount: '20',
            description: '',
            file: preview,
        },
    },
}))

export default function SearchResults(): JSX.Element {
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
