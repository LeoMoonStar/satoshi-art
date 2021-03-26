import React from 'react'

import HeaderFull from './HeaderFull'
import Header from './Header'
import Footer from './Footer'
import useStyles from './Layout.style'

type HeaderVariants = 'none' | 'full'

type ILayoutProps = {
    children: React.ReactNode
    headerVariant?: HeaderVariants
}

function Layout({
    children,
    headerVariant = 'none',
}: ILayoutProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                {
                    {
                        full: <HeaderFull />,
                        none: <Header />,
                    }[headerVariant]
                }
            </div>
            <div className={classes.content}>{children}</div>
            <footer className={classes.footer}>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout
