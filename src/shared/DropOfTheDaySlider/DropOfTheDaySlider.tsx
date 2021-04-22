import React from 'react'
import Slider from 'react-slick'
import { IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import cx from 'clsx'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import bradPitPaintImage from 'shared/images/home/bradPitPaint.png'
import Avatar from 'shared/Avatar'
import Button from 'shared/Button'
import { SliderArrow, SaveIcon, ViewsIcon } from 'shared/icons'
import useStyles from './DropOfTheDaySlider.style'
import useWalletTokens from './../../hooks/useWalletTokens'
import { isTokenOwned } from 'utils/common'

const dropsOfTheDay = [
    { id: '6080107c6aeffc0014c8df3d' }, //hardcoded one of my Token.id
    { id: '607e976877ca3c0014e4b8c2' },
    { id: '607e976877ca3c0014e4b8c2' },
    { id: '607e976877ca3c0014e4b8c2' },
    { id: '607e976877ca3c0014e4b8c2' },
    { id: '607e976877ca3c0014e4b8c2' },
]

const SliderLeft = ({ currentSlide, slideCount, ...props }: any) => {
    return (
        <button
            {...props}
            className="slick-prev slick-arrow"
            aria-hidden="true"
            aria-disabled={currentSlide === 0}
            type="button"
        >
            <SliderArrow />
        </button>
    )
}

const SliderRight = ({ currentSlide, slideCount, ...props }: any) => {
    return (
        <button
            {...props}
            className="slick-next slick-arrow"
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1}
            type="button"
        >
            <SliderArrow />
        </button>
    )
}

const sliderConfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderLeft />,
    nextArrow: <SliderRight />,
}

type DropOfTheDaySliderProps = {
    className?: string
    onSeeAll?: () => void
}

export default function DropOfTheDaySlider({
    className,
    onSeeAll,
}: DropOfTheDaySliderProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const userTokens = useWalletTokens()

    return (
        <Slider className={cx(classes.slider, className)} {...sliderConfig}>
            {dropsOfTheDay.map((el, index) => (
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
                                <div className={classes.actionButtons}>
                                    <IconButton
                                        className={classes.actionButton}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton
                                        className={classes.actionButton}
                                    >
                                        <ViewsIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className={classes.cardContent}>
                                <div className={classes.authorInfo}>
                                    <a href="">@Fimbim</a> 124.56x3 ETH
                                </div>
                                <div className={classes.workInfo}>
                                    0.25 ETH
                                    <span className={classes.count}>
                                        1 of 1
                                    </span>
                                    {isTokenOwned(el.id, userTokens) ? null : (
                                        <Button className={classes.bidButton}>
                                            {t('placeABid')}
                                        </Button>
                                    )}
                                </div>
                                {onSeeAll && (
                                    <Button
                                        onClick={onSeeAll}
                                        className={classes.seeAll}
                                        variantCustom="action"
                                    >
                                        {t('seeAll')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}
