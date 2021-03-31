import React from 'react'

import HeaderFull from './HeaderFull'
import Header from './Header'
import Footer from './Footer'
import useStyles from './Layout.style'
import { JustifyTopRowFooter } from './Footer/Footer'

type HeaderVariants = 'none' | 'full'

type ILayoutProps = {
    children: React.ReactNode
    headerVariant?: HeaderVariants
    isHeaderVisible?: boolean
    justifyTopRowFooter?: JustifyTopRowFooter
}

function Layout({
    children,
    headerVariant = 'none',
    isHeaderVisible = true,
    justifyTopRowFooter,
}: ILayoutProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                {isHeaderVisible && (
                    <>
                        {
                            {
                                full: <HeaderFull />,
                                none: <Header />,
                            }[headerVariant]
                        }
                    </>
                )}
            </div>
            <div
                style={{ paddingTop: isHeaderVisible ? 45 : 0 }}
                className={classes.content}
            >
                {children}
            </div>
            <footer className={classes.footer}>
                <Footer justifyTopRow={justifyTopRowFooter} />
            </footer>
        </div>
    )
}

export default Layout
