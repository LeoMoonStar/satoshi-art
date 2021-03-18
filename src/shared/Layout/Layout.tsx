import React from 'react'

import Header from './Header'
import Footer from './Footer'
import useStyles from './Layout.style'

type ILayoutProps = {
    children: React.ReactNode
}

function Layout({ children }: ILayoutProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Header />
            </div>
            <div className={classes.content}>{children}</div>
            <footer className={classes.footer}>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout
