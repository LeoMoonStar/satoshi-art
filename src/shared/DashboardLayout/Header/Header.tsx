import React from 'react'
import { IconButton, Input } from '@material-ui/core'
import Avatar from 'shared/Avatar'
import { useTranslation } from 'react-i18next'

import { BellIcon, SearchIcon4 } from 'shared/icons'
import useStyles from './Header.style'
import avatar from 'shared/images/artist/avatar.jpg'

function Header(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <header className={classes.container}>
            <div className={classes.searchWrapper}>
                <Input
                    type="search"
                    placeholder={t('searchHere')}
                    classes={{
                        root: classes.searchInput,
                    }}
                    disableUnderline
                />
                <IconButton className={classes.searchButton}>
                    <SearchIcon4 />
                </IconButton>
            </div>
            <div className={classes.notifies}>
                <IconButton>
                    <BellIcon />
                </IconButton>
                <div className={classes.notifiesCount}>20</div>
            </div>
            <div className={classes.profileInfo}>
                <div className={classes.greeting}>
                    {t('hello')}, <b>John</b>
                </div>
                <Avatar size={42} image={avatar} alt="John" />
            </div>
        </header>
    )
}

export default Header
