import React from 'react'
import { SpecialSliderArrowIcon } from 'shared/icons'
import Slider from 'react-slick'
import cx from 'classnames'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import useStyles from './TokensSlider.style'
import Loader from 'shared/Loader'

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
}

type TokensSliderProps = {
    title: string
    count?: number
    children: React.ReactNode
    isLoading?: boolean
}

export default function TokensSlider({
    title,
    count = 0,
    children,
    isLoading = false,
}: TokensSliderProps): JSX.Element {
    const classes = useStyles()

    const responsive = [
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
    ]

    const currentSlideToShow = responsive.reduce(
        (
            currentSlideToShow,
            { breakpoint, settings: { slidesToShow } }: any
        ) => {
            if (breakpoint > window.innerWidth) {
                return slidesToShow
            }

            return currentSlideToShow
        },
        7
    )
    const isHasMore = count > currentSlideToShow

    return (
        <>
            {' '}
            <div className={classes.container}>
                <div className={classes.head}>
                    <h2 className={classes.mainTitle}>{title}</h2>
                    {/*{isHasMore && (*/}
                    {/*    <Button*/}
                    {/*        className={classes.viewAllButton}*/}
                    {/*        variantCustom="action"*/}
                    {/*    >*/}
                    {/*        {t('viewAll')}*/}
                    {/*    </Button>*/}
                    {/*)}*/}
                </div>
                <div className={classes.sliderRow}>
                    <Slider
                        className={cx(classes.slider, {
                            [classes.sliderHasNotMore]: !isHasMore,
                        })}
                        responsive={responsive}
                        infinite={isHasMore}
                        {...sliderConfig}
                    >
                        {children}
                    </Slider>
                </div>
            </div>
            {isLoading && <Loader />}
        </>
    )
}
