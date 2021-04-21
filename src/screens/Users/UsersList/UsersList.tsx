import React from 'react'
import Pagination from 'shared/Pagination'

import history1 from 'shared/images/dropOfTheDay/history1.jpg'
import brunoMars from 'shared/images/dropOfTheDay/brunoMars.png'
import useStyles from './UsersList.style'
import Avatar from 'shared/Avatar'
import { Link } from 'react-router-dom'

const UserItem = (): JSX.Element => {
    const classes = useStyles()

    return (
        <div className={classes.item}>
            <div
                className={classes.itemIntro}
                style={{ backgroundImage: `url(${history1})` }}
            />
            <div className={classes.itemInfo}>
                <Avatar
                    size={60}
                    image={brunoMars}
                    className={classes.itemAvatar}
                />
                <h3 className={classes.itemTitle}>Fresh Meat #F</h3>
                <div className={classes.itemAdditionalInfo}>
                    <Link to="artists/1">@Fimbim</Link>
                    124.56x3 ETH
                </div>
            </div>
        </div>
    )
}

export default function UsersList(): JSX.Element {
    const classes = useStyles()

    return (
        <section className={classes.container}>
            <div className={classes.cardsWrapper}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <UserItem key={index} />
                ))}
            </div>
            <div className={classes.paginationWrapper}>
                <Pagination className={classes.pagination} />
            </div>
        </section>
    )
}
