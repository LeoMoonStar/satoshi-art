import React from 'react'
import { Link } from 'react-router-dom'

import Button from 'shared/Button'
import nftImg from 'shared/images/NFT.png'
import escalasImg from 'shared/images/escalas.png'
import shadowImage from 'shared/images/home/shadowInIntro.png'

import useStyles from './Intro.style'

export default function PopularWorks(): JSX.Element {
    const classes = useStyles()

    return (
        <section className={classes.container}>
            <div className={classes.explore}>
                <div className={classes.exploreBlock}>
                    <div className={classes.introText}>
                        <div className={classes.firstPartOfIntroText}>
                            All the
                        </div>
                        <img src={nftImg} alt="Nft" />
                        <div className={classes.secondPartOfIntroText}>
                            in the world, now together. Here for you.
                        </div>
                    </div>
                    <Link to="/search" className={classes.exploreLink}>
                        <Button
                            label={'Explore collections'}
                            className={classes.exploreButton}
                        />
                    </Link>
                </div>
                <div className={classes.exploreBlockSecond}>
                    <img src={escalasImg} />
                    <img src={shadowImage} className={classes.exploreShadow} />
                </div>
            </div>
        </section>
    )
}
