import React from 'react'

import DropOfTheDaySlider from 'shared/DropOfTheDaySlider'
import useStyles from './TheSeries.style'

export default function TheSeries(): JSX.Element {
    const classes = useStyles()

    return (
        <section className={classes.container}>
            <div className={classes.leftCol}>
                <h2 className={classes.mainTitle}>The series</h2>
                <div className={classes.content}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam iaculis, nulla eu sodales sagittis, lorem felis
                    pellentesque nibh, in varius ipsum orci et est. Aliquam
                    posuere purus mi, vitae luctus justo luctus ac. Nulla
                    pulvinar sed nisl eget eleifend. Mauris viverra finibus
                    tortor id vestibulum. Etiam nec nulla sit amet tortor.
                </div>
            </div>
            <div className={classes.rightCol}>
                <DropOfTheDaySlider className={classes.slider} />
            </div>
        </section>
    )
}
