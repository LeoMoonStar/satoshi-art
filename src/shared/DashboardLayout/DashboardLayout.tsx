import React from 'react'

import Sidebar from './Sidebar'
import Header from '../Header'

import useStyles from './DashboardLayout.style'

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps): JSX.Element {
    const classes = useStyles()

    return (
        <>
            <Header />
            <div className={classes.container}>
                <Sidebar />
                {children}
            </div>
        </>
    )
}
