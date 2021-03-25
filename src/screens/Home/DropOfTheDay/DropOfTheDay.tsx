import React from 'react'
import Slider from 'react-slick'
import { IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import colorsDissolvingImage from 'shared/images/home/colorsDissolving.png'
import { SliderArrow, SaveIcon, ViewsIcon } from 'shared/icons'
import Button from 'shared/Button'
import Avatar from 'shared/Avatar'
import bradPitImage from 'shared/images/home/bradPit.png'
import bradPitPaintImage from 'shared/images/home/bradPitPaint.png'

import useStyles from './DropOfTheDay.style'

const sliderConfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderArrow />,
    nextArrow: <SliderArrow />,
}

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
                        <Slider {...sliderConfig} className={classes.slider}>
                            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                <div key={index}>
                                    <div className={classes.slide}>
                                        <img
                                            src={bradPitPaintImage}
                                            alt=""
                                            className={classes.slideImage}
                                        />
                                        <div className={classes.info}>
                                            <Avatar
                                                alt="Fresh meat"
                                                status="premium"
                                                size={60}
                                                image={bradPitPaintImage}
                                            />
                                            <div className={classes.header}>
                                                <h3>Fresh Meat #F</h3>
                                                <div
                                                    className={
                                                        classes.actionButtons
                                                    }
                                                >
                                                    <IconButton
                                                        className={
                                                            classes.actionButton
                                                        }
                                                    >
                                                        <SaveIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        className={
                                                            classes.actionButton
                                                        }
                                                    >
                                                        <ViewsIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div
                                                className={classes.cardContent}
                                            >
                                                <div
                                                    className={
                                                        classes.authorInfo
                                                    }
                                                >
                                                    <a href="">@Fimbim</a>{' '}
                                                    124.56x3 ETH
                                                </div>
                                                <div
                                                    className={classes.workInfo}
                                                >
                                                    0.25 ETH
                                                    <span
                                                        className={
                                                            classes.count
                                                        }
                                                    >
                                                        1 of 1
                                                    </span>
                                                    <Button
                                                        className={
                                                            classes.bidButton
                                                        }
                                                    >
                                                        {t('placeABid')}
                                                    </Button>
                                                </div>
                                                <Button
                                                    className={classes.seeAll}
                                                >
                                                    {t('seeAll')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
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
