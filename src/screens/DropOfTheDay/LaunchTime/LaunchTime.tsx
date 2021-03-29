import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useStyles from './LaunchTime.style'

const getTimeDurationInCharsToTargetTime = (date: any) => {
    let timeDiff = date.getTime() - new Date().getTime()

    const days = Math.floor(timeDiff / 86400000)
    timeDiff -= days * 86400000

    const hours = Math.floor(timeDiff / 3600000)
    timeDiff -= hours * 3600000

    const minutes = Math.floor(timeDiff / 60000)
    timeDiff -= minutes * 60000

    const seconds = Math.floor(timeDiff / 1000)

    const toTimeString = (val: number): string =>
        val < 10 ? `0${val}` : `${val}`

    return {
        days: toTimeString(days),
        hours: toTimeString(hours),
        minutes: toTimeString(minutes),
        seconds: toTimeString(seconds),
    }
}

export default function LaunchTime(): JSX.Element {
    const classes = useStyles()
    const targetTime = '2021-04-06'

    const [time, setTimer] = useState(
        getTimeDurationInCharsToTargetTime(new Date(targetTime))
    )

    useEffect(() => {
        setInterval(() => {
            setTimer(getTimeDurationInCharsToTargetTime(new Date(targetTime)))
        }, 1000)
    }, [])

    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <h2 className={classes.mainTitle}>{t('launchTime')}</h2>
            <div className={classes.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                Etiam iaculis, nulla eu sodales sagittis, lorem felis
                pellentesque nibh, in varius ipsum orci et est.
            </div>
            <div className={classes.timer}>
                <div className={classes.col}>
                    <b>{time.days}</b>
                    <span>{t('days')}</span>
                </div>
                <div className={classes.col}>
                    <b>{time.hours}</b>
                    <span>{t('hours')}</span>
                </div>
                <div className={classes.col}>
                    <b>{time.minutes}</b>
                    <span>{t('minutes')}</span>
                </div>
                <div className={classes.col}>
                    <b>{time.seconds}</b>
                    <span>{t('seconds')}</span>
                </div>
            </div>
            <div className={classes.additionalInfo}>
                {t('theNextActionWillBeAvailableOn')}{' '}
                <Link to="/">April 12th</Link>.
            </div>
        </section>
    )
}
