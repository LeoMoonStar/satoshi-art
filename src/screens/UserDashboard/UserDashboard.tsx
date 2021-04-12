import React from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import { DashboardLayout } from 'shared/DashboardLayout'
import useStyles from './UserDashboard.style'

import CardsStatistics from './CardsStatistics'
import Intro from './Intro'
import YourLatestBids from './Tokens/YourLatestBids'
import OnSale from './Tokens/OnSale'
import Collections from './Tokens/Collections'
import FollowingAndFollowers from './Tokens/FollowingAndFollowers'
import Charts from './Charts'

// todo: Remove useless files in Tokens dir
export default function UserDashboard(): JSX.Element {
    const classes = useStyles()

    return (
        <DashboardLayout>
            <div className={classes.container}>
                <Intro />
                <CardsStatistics />
                <Charts />
                <YourLatestBids />
                <OnSale />
                <Collections />
                <FollowingAndFollowers />
            </div>
        </DashboardLayout>
    )
}
