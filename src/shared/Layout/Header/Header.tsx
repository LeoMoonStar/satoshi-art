import React from 'react'
import { Input } from '@material-ui/core'
import Button from 'shared/Button'

import { ReactComponent as LogoIcon } from 'shared/icons/logoHeader.svg'
import { ReactComponent as SearchIcon1 } from 'shared/icons/searchIcons/searchIcon1.svg'
import { ReactComponent as SearchIcon2 } from 'shared/icons/searchIcons/searchIcon2.svg'
import { ReactComponent as SearchIcon3 } from 'shared/icons/searchIcons/searchIcon3.svg'
import { ReactComponent as SearchIcon4 } from 'shared/icons/searchIcons/searchIcon4.svg'
import useStyles from './Header.style'

function Header(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.logo}>
                <LogoIcon />
            </div>
            <div className={classes.controls}>
                <div className={classes.searchWrapper}>
                    <div className={classes.search}>
                        <Input
                            type="search"
                            classes={{
                                root: classes.searchInput,
                            }}
                            disableUnderline
                        />
                        <div className={classes.searchIcons}>
                            <SearchIcon1 />
                            <SearchIcon2 />
                            <SearchIcon3 />
                            <SearchIcon4 />
                        </div>
                    </div>
                </div>

                <Button
                    label={'Connect Wallet'}
                    className={classes.connectWalletBtn}
                />

                <Button label={'Create'} className={classes.createBtn} />
            </div>
        </div>
    )
}

export default Header
