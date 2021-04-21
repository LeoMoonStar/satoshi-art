import React from 'react'
import Pagination from 'shared/Pagination'
import { useHistory } from 'react-router-dom'

import history1 from 'shared/images/dropOfTheDay/history1.jpg'
import history2 from 'shared/images/dropOfTheDay/history2.jpg'
import history3 from 'shared/images/dropOfTheDay/history3.jpg'
import rihanna from 'shared/images/dropOfTheDay/rihanna.png'
import ryanRyanHold from 'shared/images/dropOfTheDay/ryanReynhold.png'
import brunoMars from 'shared/images/dropOfTheDay/brunoMars.png'
import useStyles from './History.style'
import DropOfTheDayArtist from 'shared/DropOfTheDayArtist'

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
    const history = useHistory()

    const handleSeeAll = () => {
        history.push('/drop-of-the-day')
    }

    return (
        <section className={classes.container}>
            {items.map((item) => (
                <DropOfTheDayArtist
                    onSeeAll={handleSeeAll}
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
