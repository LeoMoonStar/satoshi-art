import React from 'react'

import Avatar from 'shared/Avatar'
import preview from 'shared/images/artist/work.jpg'
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
        <div className={classes.card} key={token.id}>
            <div className={classes.topWrapper}>
                <div className={classes.tokenPreviewWrapper}>
                    <img
                        className={classes.tokenPreview}
                        src={token.thumbnail ?? payload?.cover ?? payload?.file}
                        alt={payload?.description}
                    />
                </div>
            </div>
            <Avatar className={classes.avatar} image={preview} size={60} />
            <RenderContent token={token} />
        </div>
    )
}
