import React from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import { DashboardLayout } from 'shared/DashboardLayout'
import useStyles from './UserDashboard.style'

import { Created } from './Tokens'

export default function UserDashboard(): JSX.Element {
    const classes = useStyles()

    return (
        <DashboardLayout>
            <div className={classes.container}>
                {/*<Intro />*/}
                {/*<CardsStatistics />*/}
                {/*<Charts />*/}
                {/*<YourLatestBids />*/}
                {/*<OnSale />*/}
                {/*<Collections />*/}
                <Created />
                {/*<FollowingAndFollowers />*/}
            </div>
        </DashboardLayout>
    )
}
