import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'shared/Button'
import { useTranslation } from 'react-i18next'

import Avatar from 'shared/Avatar'
import img from 'shared/images/artist/avatar.jpg'
import top1 from 'shared/images/home/tops1.png'
import top2 from 'shared/images/home/tops2.png'
import top3 from 'shared/images/home/tops3.png'

import useStyles from './Tops.style'

export default function Tops(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <div className={classes.col}>
                    <small className={classes.subTitle}>
                        {t('recentlyCollected')}
                    </small>
                    <h2 className={classes.title}>{t('topCollectors')}</h2>
                    <img src={top1} alt="" className={classes.prevImage} />
                    <div className={classes.users}>
                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>

                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>

                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>
                    </div>
                    <Link to="" className={classes.seeAllLink}>
                        <Button>{t('seeAll')}</Button>
                    </Link>
                </div>
                <div className={classes.col}>
                    <small className={classes.subTitle}>
                        {t('recentSales')}
                    </small>
                    <h2 className={classes.title}>{t('topArtists')}</h2>
                    <img src={top2} alt="" className={classes.prevImage} />
                    <div className={classes.users}>
                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>
                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>
                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>
                    </div>
                    <Link to="" className={classes.seeAllLink}>
                        <Button>{t('seeAll')}</Button>
                    </Link>
                </div>
                <div className={classes.col}>
                    <small className={classes.subTitle}>
                        {t('artworksOwned')}
                    </small>
                    <h2 className={classes.title}>{t('largestCollections')}</h2>
                    <img src={top3} alt="" className={classes.prevImage} />
                    <div className={classes.users}>
                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>
                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>
                        <Link to="/" className={classes.user}>
                            <Avatar image={img} status="premium" />
                            <div className={classes.info}>
                                <b className={classes.userName}>Fimbim</b>
                                <div className={classes.price}>1.124</div>
                            </div>
                        </Link>
                    </div>
                    <Link to="" className={classes.seeAllLink}>
                        <Button>{t('seeAll')}</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
