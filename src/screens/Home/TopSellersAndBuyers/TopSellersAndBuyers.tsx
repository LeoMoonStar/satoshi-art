import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from 'shared/Button'
import Avatar from 'shared/Avatar'
import bradPit from 'shared/images/home/bradPitPaint.png'

import useStyles from './TopSellersAndBuyers.style'

const items = [
    { id: 1, name: 'Fimbim', currency: 124.563 },
    { id: 2, name: 'Redlioneye', currency: 121.563 },
    { id: 3, name: 'Fimbim', currency: 12.563 },
    { id: 4, name: 'Redlioneye', currency: 1.563 },
    { id: 5, name: 'Fimbim', currency: 0.563 },
    { id: 6, name: 'Fimbim', currency: 124.563 },
    { id: 7, name: 'Redlioneye', currency: 121.563 },
    { id: 8, name: 'Fimbim', currency: 12.563 },
    { id: 9, name: 'Redlioneye', currency: 1.563 },
    { id: 10, name: 'Fimbim', currency: 0.563 },
]

export default function TopSellersAndBuyers(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <div className={classes.group}>
                <div className={classes.groupWrapper}>
                    <h2
                        className={classes.mainTitle}
                        style={{ color: '#FF0099' }}
                    >
                        {t('topSeller')}
                    </h2>
                    <div className={classes.groupItems}>
                        {items.map(({ id, name, currency }) => {
                            return (
                                <Link
                                    to={`/artists/${id}`}
                                    key={id}
                                    className={classes.topsItem}
                                >
                                    <div className={classes.index}>{id}</div>
                                    <Avatar
                                        size={48}
                                        image={bradPit}
                                        status="premium"
                                    />
                                    <div className={classes.info}>
                                        <b className={classes.userName}>
                                            {name}
                                        </b>
                                        <div className={classes.currency}>
                                            {currency}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <Button className={classes.seeAll}>{t('seeAll')}</Button>
                </div>
            </div>
            <div className={classes.group}>
                <div className={classes.groupWrapper}>
                    <h2
                        className={classes.mainTitle}
                        style={{ color: '#6A2FE7' }}
                    >
                        {t('topBuyers')}
                    </h2>
                    <div className={classes.groupItems}>
                        {items.map(({ id, name, currency }) => {
                            return (
                                <Link
                                    to={`/artists/${id}`}
                                    key={id}
                                    className={classes.topsItem}
                                >
                                    <div className={classes.index}>{id}</div>
                                    <Avatar
                                        size={48}
                                        image={bradPit}
                                        status="premium"
                                    />
                                    <div className={classes.info}>
                                        <b className={classes.userName}>
                                            {name}
                                        </b>
                                        <div className={classes.currency}>
                                            {currency}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <Button className={classes.seeAll}>{t('seeAll')}</Button>
                </div>
            </div>
        </div>
    )
}
