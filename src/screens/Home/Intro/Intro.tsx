import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from 'shared/Button'
import nftImg from 'shared/images/NFT.png'
import escalasImg from 'shared/images/escalas.png'
import shadowImage from 'shared/images/home/shadowInIntro.png'

import useStyles from './Intro.style'

export default function PopularWorks(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section>
            <div className={classes.container}>
                <div className={classes.explore}>
                    <div className={classes.exploreBlock}>
                        <div className={classes.introText}>
                            <div className={classes.firstPartOfIntroText}>
                                {t('allThe')}
                            </div>
                            <img src={nftImg} alt="Nft" />
                            <div className={classes.secondPartOfIntroText}>
                                {t('inTheWorldNowTogetherHereForYou')}
                            </div>
                        </div>
                        <Link to="/search" className={classes.exploreLink}>
                            <Button
                                label={t('exploreCollections')}
                                className={classes.exploreButton}
                            />
                        </Link>
                    </div>
                    <div className={classes.exploreBlockSecond}>
                        <img src={escalasImg} />
                    </div>
                </div>
                <img src={shadowImage} className={classes.exploreShadow} />
            </div>
        </section>
    )
}
