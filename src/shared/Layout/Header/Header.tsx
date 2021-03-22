import React from 'react'
import { Input } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Button from 'shared/Button'
import ConnectButton from 'shared/ConnectButton'
import {
    LogoIcon,
    SearchIcon1,
    SearchIcon2,
    SearchIcon3,
    SearchIcon4,
} from 'shared/icons'
import useStyles from './Header.style'

function Header(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

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

                <ConnectButton />

                <Link to="/create-collectible" className={classes.createLink}>
                    <Button label={t('create')} className={classes.createBtn} />
                </Link>
            </div>
        </div>
    )
}

export default Header
