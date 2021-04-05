import React from 'react'
import { useTranslation } from 'react-i18next'

import bradImage from 'shared/images/dropOfTheDay/bradPit.png'

import useStyles from './Introduction.style'

export default function TheSeries(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <article className={classes.article}>
                <h2 className={classes.title}>Brad Pitt</h2>
                <div className={classes.content}>
                    William Bradley Pitt (born December 18, 1963) is an American
                    actor and film producer. He has received multiple awards,
                    including two Golden Globe Awards and an Academy Award for
                    his acting, in addition to another Academy Award, another
                    Golden Globe Award and a Primetime Emmy Award as producer
                    under his production company, Plan B Entertainment.
                </div>
                <div className={classes.pageTitle}>{t('dropOfTheDay')}</div>
            </article>
            <img className={classes.artistImage} src={bradImage} alt="" />
        </section>
    )
}
