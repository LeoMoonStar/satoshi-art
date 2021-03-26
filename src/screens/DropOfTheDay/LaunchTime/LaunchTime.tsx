import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './LaunchTime.style'

export default function LaunchTime(): JSX.Element {
    const classes = useStyles()
    // const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <h2 className={classes.mainTitle}>Launch Time</h2>
            <div className={classes.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                iaculis, nulla eu sodales sagittis, lorem felis pellentesque
                nibh, in varius ipsum orci et est.
            </div>
            <div className={classes.timer}>
                <div className={classes.col}>
                    <b>12</b>
                    <span>Days</span>
                </div>
                <div className={classes.col}>
                    <b>05</b>
                    <span>Hours</span>
                </div>
                <div className={classes.col}>
                    <b>29</b>
                    <span>Min</span>
                </div>
                <div className={classes.col}>
                    <b>04</b>
                    <span>Sec</span>
                </div>
            </div>
            <div className={classes.additionalInfo}>
                The next auction will be available on{' '}
                <Link to="/">April 12th</Link>.
            </div>
        </section>
    )
}
