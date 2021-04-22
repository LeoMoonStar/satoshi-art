import React from 'react'
import SearchHeader from '../SearchHeader'
import Works from 'shared/Works'

import useStyles from './SearchResults.style'
// import preview from 'shared/images/artist/work.jpg'
// import { TokenType } from 'state/transactions/actions'
// import { testingArray } from '../../../utils/testingArray'
import { Token } from 'api/tokens'

// const tokens = Array.from({ length: 23 }, (index) => ({
//     TokenID: index as string,
//     id: `id${index}`,
//     metadata: {
//         type: TokenType.MULTIPLE,
//         thumbnail: preview,
//         payload: {
//             name: 'Fresh Meat #F',
//             copiesCount: 20,
//             description: '',
//             file: preview,
//         },
//     },
// }))

// const testingTokens = testingArray(tokens)

type SearchResultsProps = {
    testTokens?: Token[]
    tokens?: Token[]
}

export default function SearchResults({
    testTokens = [],
    tokens = [],
}: SearchResultsProps): JSX.Element {
    const classes = useStyles()
    return (
        <div>
            <SearchHeader />
            <div className={classes.container}>
                <Works
                    isLoading={false}
                    tokens={tokens}
                    testTokens={testTokens}
                />
            </div>
        </div>
    )
}
