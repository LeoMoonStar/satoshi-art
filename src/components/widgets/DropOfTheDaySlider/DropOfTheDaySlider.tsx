import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import cx from 'clsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { SliderArrow } from 'components/icons';
import useStyles from './DropOfTheDaySlider.style';
import DropOfTheDaySliderItem from './DropOfTheDaySliderItem/DropOfTheDaySliderItem';
import { getDropOfTheDay } from 'apis/users';

const dropsOfTheDay = [
  { id: '6080107c6aeffc0014c8df3d', name: 'Fresh Meat #A', price: '0.25' }, //hardcoded one of my Token.id
  { id: '607e976877ca3c0014e4b8c2', name: 'Fresh Meat #B', price: '0.20' },
  { id: '607e976877ca3c0014e4b8c2', name: 'Fresh Meat #C', price: '0.10' },
  { id: '607e976877ca3c0014e4b8c2', name: 'Fresh Meat #D', price: '0.30' },
  { id: '607e976877ca3c0014e4b8c2', name: 'Fresh Meat #E', price: '0.15' },
  { id: '607e976877ca3c0014e4b8c2', name: 'Fresh Meat #F', price: '0.45' },
];

const SliderLeft = ({ currentSlide, slideCount, ...props }: any) => {
  return (
    <button
      {...props}
      className='slick-prev slick-arrow'
      aria-hidden='true'
      aria-disabled={currentSlide === 0}
      type='button'
    >
      <SliderArrow />
    </button>
  );
};

const SliderRight = ({ currentSlide, slideCount, ...props }: any) => {
  return (
    <button
      {...props}
      className='slick-next slick-arrow'
      aria-hidden='true'
      aria-disabled={currentSlide === slideCount - 1}
      type='button'
    >
      <SliderArrow />
    </button>
  );
};

const sliderConfig = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SliderLeft />,
  nextArrow: <SliderRight />,
};

type DropOfTheDaySliderProps = {
  className?: string,
  name: string,
  imagePreview: string
};

export default function DropOfTheDaySlider({ name, className, imagePreview }: DropOfTheDaySliderProps): JSX.Element {
  const classes = useStyles();
  const [collectibles, setCollectibles] = useState([])

  useEffect(() => {
    getDropOfTheDay().then(({ data }) => setCollectibles(data));
  }, [])

  return (
    <Slider className={cx(classes.slider, className)} {...sliderConfig}>
      {collectibles.map((el: any, index) => (
        <div key={index} onClick={() => location.replace('/drop-of-the-day/' + el.id)}>
          <DropOfTheDaySliderItem id={el.id} name={el.name} imagePreview={el.thumbnailUrl} price={el.price}/>
        </div>
      ))}
    </Slider>
  );
}
