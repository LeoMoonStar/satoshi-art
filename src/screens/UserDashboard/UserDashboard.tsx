import React, { useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import { DashboardLayout } from 'shared/DashboardLayout'
import useStyles from './UserDashboard.style'

import { Created, OnSale } from './Tokens'

export default function UserDashboard(): JSX.Element {
    const classes = useStyles()

    // todo: move all sliders in separate component with state outOfDatesSliders. It allow us avoid useless
    //  rerender for charts
    const [outOfDatesSliders, setOutOfDatesSliders] = useState<
        Record<string, any>
    >({ onSale: true, created: true })

    return (
        <DashboardLayout>
            <div className={classes.container}>
                {/*<Intro />*/}
                {/*<CardsStatistics />*/}
                {/*<Charts />*/}
                {/*<YourLatestBids />*/}
                <OnSale isOutOfDate={outOfDatesSliders.onSale} />
                {/*<Collections />*/}
                <Created
                    setOutOfDatesSliders={(state: any) =>
                        setOutOfDatesSliders({ ...outOfDatesSliders, ...state })
                    }
                />
                {/*<FollowingAndFollowers />*/}
            </div>
        </DashboardLayout>
    )
}
