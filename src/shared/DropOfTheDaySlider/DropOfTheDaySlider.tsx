import React from 'react'
import Slider from 'react-slick'
import cx from 'clsx'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { SliderArrow } from 'shared/icons'
import useStyles from './DropOfTheDaySlider.style'
import DropOfTheDaySliderItem from './DropOfTheDaySliderItem/DropOfTheDaySliderItem'

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

    return (
        <Slider className={cx(classes.slider, className)} {...sliderConfig}>
            {dropsOfTheDay.map((el, index) => (
                <div key={index}>
                    <DropOfTheDaySliderItem id={el.id} />
                </div>
            ))}
        </Slider>
    )
}
