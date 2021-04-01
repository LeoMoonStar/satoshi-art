import React, { useRef, useState } from 'react'
import { IconButton, Input, Popover } from '@material-ui/core'
import Avatar from 'shared/Avatar'
import { useTranslation } from 'react-i18next'

import Notifications from './Notifications'
import { BellIcon, SearchIcon4 } from 'shared/icons'
import useStyles from './Header.style'
import avatar from 'shared/images/artist/avatar.jpg'

function Header(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const [isOpen, setOpen] = useState<boolean>(false)
    const anchorElRef = useRef<HTMLDivElement>(null)

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
            <div className={classes.notifies} ref={anchorElRef}>
                <IconButton onClick={() => setOpen(!isOpen)}>
                    <BellIcon />
                </IconButton>
                <div className={classes.notifiesCount}>20</div>
                <Popover
                    anchorEl={anchorElRef?.current}
                    classes={{
                        paper: classes.paperNotification,
                    }}
                    open={isOpen}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={() => setOpen(false)}
                    disableRestoreFocus
                >
                    <Notifications />
                </Popover>
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
