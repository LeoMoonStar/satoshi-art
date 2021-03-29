import React from 'react'
import { useTranslation } from 'react-i18next'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import colorsDissolvingImage from 'shared/images/home/colorsDissolving.png'
import bradPitImage from 'shared/images/home/bradPit.png'
import DropOfTheDaySlider from 'shared/DropOfTheDaySlider'

import useStyles from './DropOfTheDay.style'

export default function DropOfTheDay(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <div className={classes.innerContainer}>
                <h2 className={classes.mainTitle}>{t('dropOfTheDay')}</h2>
                <div className={classes.card}>
                    <div className={classes.leftCol}>
                        <h3>Brad Pit</h3>
                        <img src={bradPitImage} />
                    </div>
                    <div className={classes.rightCol}>
                        <DropOfTheDaySlider />
                    </div>
                </div>
            </div>
            <img
                className={classes.colorsDissolving}
                src={colorsDissolvingImage}
            />
        </section>
    )
}
