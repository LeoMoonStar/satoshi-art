import React from 'react'

import Layout from 'shared/Layout'
import DropOfTheDayInDetails from './DropOfTheDayInDetails'
import DropOfTheDayWorkCards from './DropOfTheDayWorkCards'
import SpecialEdition from './SpecialEdition'
import LaunchTime from './LaunchTime'
import TopSeries from './TheSeries'
import Introduction from './Introduction'

import useStyles from './DropOfTheDay.style'

export default function DropOfTheDay(): JSX.Element {
    const classes = useStyles()
    return (
        <Layout isHeaderVisible={false}>
            <div className={classes.container}>
                <Introduction />
                <TopSeries />
                <LaunchTime />
                <SpecialEdition />
                <DropOfTheDayWorkCards />
                <DropOfTheDayInDetails />
            </div>
        </Layout>
    )
}
