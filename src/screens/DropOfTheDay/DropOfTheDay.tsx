import React from 'react'

import Layout from 'shared/Layout'
import DropOfTheDayInDetails from './DropOfTheDayInDetails'
import DropOfTheDayWorkCards from './DropOfTheDayWorkCards'
import SpecialEdition from './SpecialEdition'
import LaunchTime from './LaunchTime'

import useStyles from './DropOfTheDay.style'

export default function DropOfTheDay(): JSX.Element {
    const classes = useStyles()
    return (
        <Layout>
            <div className={classes.container}>
                <LaunchTime />
                <SpecialEdition />
                <DropOfTheDayWorkCards />
                <DropOfTheDayInDetails />
            </div>
        </Layout>
    )
}
