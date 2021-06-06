import React from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import Button from 'components/button';
import specialEditionImage from 'components/images/dropOfTheDay/specialEdition.png';
import useStyles from './SpecialEditon.style';

type SpecialEditionProp = {
    image: string
    title: string
    year: string
    content: string
    contentList: any
    addContent: string
    productId: string

}

export default function LaunchTime({ image, title, year, content, contentList, addContent, productId }: SpecialEditionProp): JSX.Element {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div className={classes.specialEditionCard}>
        <img className={classes.image} src={image} alt='' />
        <div className={classes.infoWrapper}>
          <div className={classes.titleOfSection}>{text['specialEdition']}</div>
          <h2 className={classes.title}>{title}</h2>
          <time className={classes.date}>{year}</time>
          <div className={classes.content}>
            <p>{content}</p>
            <ul>{contentList.map((info: any, index: number) => <li key={index}>{info}</li>)}</ul>
          </div>
          <div className={classes.additionalInfo}>{addContent}</div>
          <Link to={`/product/1`} className={classes.linkAsButton}>
            <Button variantCustom='action'>{text['productPage']}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
