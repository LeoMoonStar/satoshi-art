import React from 'react'
import cx from 'classnames'

import useStyles from './DropOfTheDayArtist.style'
import DropOfTheDaySlider from 'shared/DropOfTheDaySlider'

type HistoryItemProps = {
    color: string
    name: string
    artistImage: string
    imagePreview?: string
}

export default function DropOfTheDayArtist({
    color,
    name,
    artistImage,
}: HistoryItemProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.card} style={{ backgroundColor: color }}>
                <div className={classes.leftCol}>
                    <h3>{name}</h3>
                    <img src={artistImage} />
                </div>
                <div
                    className={cx(classes.rightCol, {
                        [classes.whiteSliderDots]: color === '#C4C4C4',
                    })}
                >
                    <DropOfTheDaySlider />
                </div>
            </div>
        </div>
    )
}
