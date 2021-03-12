import React from 'react'

import useStyles from './Header.style'

import { ReactComponent as LogoIcon } from 'shared/icons/logoHeader.svg'

function Header(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.logo}>
                <LogoIcon />
            </div>
            <div className={classes.controls}>controls</div>
        </div>
    )
}

export default Header
