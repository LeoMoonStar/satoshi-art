import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from 'shared/Button'
import specialEditionImage from 'shared/images/dropOfTheDay/specialEdition.png'
import useStyles from './SpecialEditon.style'

export default function LaunchTime(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <div className={classes.specialEditionCard}>
                <img
                    className={classes.image}
                    src={specialEditionImage}
                    alt=""
                />
                <div className={classes.infoWrapper}>
                    <div className={classes.titleOfSection}>
                        {t('specialEdition')}
                    </div>
                    <h2 className={classes.title}>
                        I’m Jack’s wasted life NFT (1-of-1)
                    </h2>
                    <time className={classes.date}>2021</time>
                    <div className={classes.content}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Etiam iaculis, nulla eu sodales sagittis,
                            lorem felis pellentesque nibh, in varius ipsum orci
                            et est. Aliquam posuere purus mi, vitae luctus justo
                            luctus ac. Nulla pulvinar sed nisl eget eleifend.
                            Mauris viverra finibus tortor id vestibulum.
                        </p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Etiam iaculis nulla eu sodales sagittis</li>
                            <li>
                                Felis pellentesque nibh, in varius ipsum orci et
                            </li>
                            <li>
                                Aliquam posuere purus mi, vitae luctus justo
                            </li>
                            <li>Nulla pulvinar sed nisl</li>
                        </ul>
                    </div>
                    <div className={classes.additionalInfo}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam iaculis, nulla eu sodales sagittis.
                    </div>
                    <Link to="/" className={classes.linkAsButton}>
                        <Button variantCustom="action">
                            {t('productPage')}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
