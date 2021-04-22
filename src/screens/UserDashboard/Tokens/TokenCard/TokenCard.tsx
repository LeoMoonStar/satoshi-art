import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from 'shared/Avatar'
import preview from 'shared/images/artist/work.jpg'
import TokenPreview from 'shared/TokenPreview'
import useStyles from './TokenCard.style'

type TokensSliderProps = {
    token: any
    renderContent: (toke: any) => JSX.Element
}

export default function TokenCard({
    token,
    renderContent: RenderContent,
}: TokensSliderProps): JSX.Element {
    const classes = useStyles()
    const { payload } = token?.metadata

    return (
        <Link
            to={`/product/${token.id}`}
            className={classes.card}
            key={token.id}
        >
            <div className={classes.topWrapper}>
                <TokenPreview
                    className={classes.tokenPreview}
                    src={token.thumbnail ?? payload?.cover ?? payload?.file}
                    alt={payload?.description}
                />
            </div>
            <Avatar className={classes.avatar} image={preview} size={60} />
            <RenderContent token={token} />
        </Link>
    )
}
