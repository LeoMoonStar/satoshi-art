import React from 'react'

import Header from '../Header'
import Footer from './Footer'
import useStyles from './Layout.style'
import { JustifyTopRowFooter } from './Footer/Footer'

type HeaderVariants = 'none' | 'full'

type ILayoutProps = {
    children: React.ReactNode
    headerVariant?: HeaderVariants
    isHeaderVisible?: boolean
    justifyTopRowFooter?: JustifyTopRowFooter
    containerPaddingTop?: number
    headerBackground?: string
    positionHeader?: 'sticky' | 'absolute'
    inverseHeader?: boolean
    hasHeaderDivider?: boolean
}

function Layout({
    children,
    positionHeader = 'sticky',
    containerPaddingTop = 45,
    headerBackground = '#fff',
    inverseHeader = false,
    isHeaderVisible = true,
    hasHeaderDivider = true,
    justifyTopRowFooter,
}: ILayoutProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div
                className={classes.header}
                style={{
                    backgroundColor: headerBackground,
                    position: positionHeader,
                }}
            >
                {isHeaderVisible && (
                    <Header
                        hasDivider={hasHeaderDivider}
                        inverseHeader={inverseHeader}
                    />
                )}
            </div>
            <div
                style={{ paddingTop: containerPaddingTop }}
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
