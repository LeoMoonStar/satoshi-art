import React from 'react'

import useStyles from './Header.style'

import LogoIcon from 'shared/icons/logoHeader.png'

function Header(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.logo}>
                <img src={LogoIcon} alt="logo" />
            </div>
            <div className={classes.controls}>controls</div>
        </div>
    )
}

export default Header
