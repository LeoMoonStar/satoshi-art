import React from 'react'

import { DashboardLayout } from 'shared/DashboardLayout'

import OrderListFilters from './OrderListFilters'
import OrderListData from './OrderListData'

import useStyles from './OrderList.style'

export default function OrderList(): JSX.Element {
    const classes = useStyles()
    return (
        <DashboardLayout>
            <div className={classes.container}>
                <OrderListFilters />
                <OrderListData />
            </div>
        </DashboardLayout>
    )
}
