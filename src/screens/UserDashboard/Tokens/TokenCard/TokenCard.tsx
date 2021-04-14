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
    renderContent,
}: TokensSliderProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.card} key={token.id}>
            <div className={classes.topWrapper}>
                <div className={classes.tokenPreviewWrapper}>
                    <img
                        className={classes.tokenPreview}
                        src={preview}
                        alt=""
                    />
                </div>
            </div>
            <Avatar className={classes.avatar} image={preview} size={60} />
            {renderContent(token)}
        </div>
    )
}
