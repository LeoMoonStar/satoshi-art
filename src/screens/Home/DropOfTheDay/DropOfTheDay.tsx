import React from 'react'
import { useTranslation } from 'react-i18next'

import colorsDissolvingImage from 'shared/images/home/colorsDissolving.png'
import bradPitImage from 'shared/images/home/bradPit.png'
import DropOfTheDayArtist from 'shared/DropOfTheDayArtist'

import useStyles from './DropOfTheDay.style'

export default function DropOfTheDay(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <div className={classes.innerContainer}>
                <h2 className={classes.mainTitle}>{t('dropOfTheDay')}</h2>
                <DropOfTheDayArtist
                    color={'#7E7E7E'}
                    name="Brad Pit"
                    artistImage={bradPitImage}
                />
            </div>
            <img
                className={classes.colorsDissolving}
                src={colorsDissolvingImage}
            />
        </section>
    )
}
