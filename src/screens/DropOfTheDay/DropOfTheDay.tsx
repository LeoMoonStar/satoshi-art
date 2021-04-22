import React from 'react'

import Layout from 'shared/Layout'
import DropOfTheDayInDetails from './DropOfTheDayInDetails'
import DropOfTheDayWorkCards from './DropOfTheDayWorkCards'
import SpecialEdition from './SpecialEdition'
import LaunchTime from './LaunchTime'
import TopSeries from './TheSeries'
import Introduction from './Introduction'

export default function DropOfTheDay(): JSX.Element {
    return (
        <Layout
            hasHeaderDivider={false}
            containerPaddingTop={0}
            headerBackground="#00000080"
            inverseHeader
            positionHeader="fixed"
            // justifyTopRowFooter="center"
        >
            <Introduction />
            <TopSeries />
            <LaunchTime />
            <SpecialEdition />
            <DropOfTheDayWorkCards />
            <DropOfTheDayInDetails />
        </Layout>
    )
}
