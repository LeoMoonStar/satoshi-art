import React from 'react'
import Pagination from 'shared/Pagination'

import history1 from 'shared/images/dropOfTheDay/history1.jpg'
import history2 from 'shared/images/dropOfTheDay/history2.jpg'
import history3 from 'shared/images/dropOfTheDay/history3.jpg'
import rihanna from 'shared/images/dropOfTheDay/rihanna.png'
import ryanRyanHold from 'shared/images/dropOfTheDay/ryanReynhold.png'
import brunoMars from 'shared/images/dropOfTheDay/brunoMars.png'
import useStyles from './History.style'
import HistoryItem from './HistoryItem'

const items = [
    {
        id: 1,
        color: '#C4C4C4',
        name: 'Rihanna',
        itemPreview: history1,
        artistImage: rihanna,
    },
    {
        id: 2,
        color: '#00C2FF',
        name: 'Bruno\nMars',
        itemPreview: history2,
        artistImage: brunoMars,
    },
    {
        id: 3,
        color: '#4D0ED2',
        name: 'Ryan\nReynolds',
        itemPreview: history3,
        artistImage: ryanRyanHold,
    },
]

export default function History(): JSX.Element {
    const classes = useStyles()

    return (
        <section className={classes.container}>
            {items.map((item) => (
                <HistoryItem
                    key={item.id}
                    color={item.color}
                    name={item.name}
                    artistImage={item.artistImage}
                    imagePreview={item.itemPreview}
                />
            ))}
            <div className={classes.paginationWrapper}>
                <Pagination />
            </div>
        </section>
    )
}
