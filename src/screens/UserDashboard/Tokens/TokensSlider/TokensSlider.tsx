import React from 'react'
import { SpecialSliderArrowIcon } from 'shared/icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import useStyles from './TokensSlider.style'
import Button from 'shared/Button'

const SliderLeft = ({ currentSlide, slideCount, ...props }: any) => {
    return (
        <button
            {...props}
            className="slick-prev slick-arrow"
            aria-hidden="true"
            aria-disabled={currentSlide === 0}
            type="button"
        >
            <SpecialSliderArrowIcon />
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
            <SpecialSliderArrowIcon />
        </button>
    )
}

const sliderConfig = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    prevArrow: <SliderLeft />,
    nextArrow: <SliderRight />,
    responsive: [
        {
            breakpoint: 1920,
            settings: {
                slidesToShow: 7,
            },
        },
        {
            breakpoint: 1800,
            settings: {
                slidesToShow: 6,
            },
        },
        {
            breakpoint: 1660,
            settings: {
                slidesToShow: 5,
            },
        },
        {
            breakpoint: 1430,
            settings: {
                slidesToShow: 4,
            },
        },
    ],
}

type TokensSliderProps = {
    title: string
    children: React.ReactNode
}

export default function TokensSlider({
    title,
    children,
}: TokensSliderProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.head}>
                <h2 className={classes.mainTitle}>{title}</h2>
                <Button
                    className={classes.viewAllButton}
                    variantCustom="action"
                >
                    View All
                </Button>
            </div>
            <div className={classes.sliderRow}>
                <Slider className={classes.slider} {...sliderConfig}>
                    {children}
                </Slider>
            </div>
        </div>
    )
}
