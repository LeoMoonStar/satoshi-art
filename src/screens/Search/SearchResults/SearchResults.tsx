import React from 'react'
import SearchHeader from '../SearchHeader'
import Works from 'shared/Works'

import useStyles from './SearchResults.style'
import preview from 'shared/images/artist/work.jpg'
import { TokenType } from 'state/transactions/actions'
import { TokenStatus } from 'api/tokens'

const tokens = Array.from({ length: 24 }, (index) => ({
    TokenID: index as string,
    id: `id${index}`,
    status: TokenStatus.waitForBid,
    metadata: {
        type: TokenType.MULTIPLE,
        thumbnail: preview,
        walletHash: '00030fgr039023tjkujrghjith',
        payload: {
            name: 'Fresh Meat #F',
            copiesCount: 20,
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
