import React from 'react'
import Slider from 'react-slick'
import { IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import cx from 'clsx'

import bradPitPaintImage from 'shared/images/home/bradPitPaint.png'
import Avatar from 'shared/Avatar'
import Button from 'shared/Button'
import { SliderArrow, SaveIcon, ViewsIcon } from 'shared/icons'
import useStyles from './DropOfTheDaySlider.style'

const SliderLeft = ({ currentSlide, slideCount, ...props }: any) => {
    return (
        <button
            {...props}
            className={
                'slick-prev slick-arrow' +
                (currentSlide === 0 ? ' slick-disabled' : '')
            }
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
            className={
                'slick-next slick-arrow' +
                (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
            }
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
}

export default function DropOfTheDaySlider({
    className,
}: DropOfTheDaySliderProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <Slider className={cx(classes.slider, className)} {...sliderConfig}>
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
                                    <Button className={classes.bidButton}>
                                        {t('placeABid')}
                                    </Button>
                                </div>
                                <Button
                                    className={classes.seeAll}
                                    variant="action"
                                >
                                    {t('seeAll')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}
