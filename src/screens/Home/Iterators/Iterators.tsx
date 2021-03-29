import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'shared/Button'
import iterator1 from 'shared/images/home/iterator1.png'
import iterator2 from 'shared/images/home/iterator2.png'
import iterator3 from 'shared/images/home/iterator3.png'

import useStyles from './Iterators.style'

export default function Iterators(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section>
            <div className={classes.container}>
                <h2 className={classes.mainTitle}>
                    {t('previousWeeklyIterations')}
                </h2>
                <div className={classes.card}>
                    <img className={classes.image} src={iterator1} alt="" />
                    <h3 className={classes.name}>Rihanna</h3>
                </div>
                <div className={classes.card}>
                    <img className={classes.image} src={iterator2} alt="" />
                    <h3 className={classes.name}>Bruno Mars</h3>
                </div>
                <div className={classes.card}>
                    <img className={classes.image} src={iterator3} alt="" />
                    <h3 className={classes.name}>Ryan Reynolds</h3>
                </div>
                <div className={classes.buttonRow}>
                    <Button variant="action">{t('seeAllHistory')}</Button>
                </div>
            </div>
        </section>
    )
}
