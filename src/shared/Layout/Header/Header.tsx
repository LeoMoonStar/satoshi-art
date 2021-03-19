import React from 'react'
import { Input, Modal } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Button from 'shared/Button'
import ConnectButton from 'shared/ConnectButton'
import Followers from 'shared/Followers'
import {
    LogoIcon,
    SearchIcon1,
    SearchIcon2,
    SearchIcon3,
    SearchIcon4,
} from 'shared/icons'
import useStyles from './Header.style'

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        position: 'absolute',
        outline: 0,
    } as React.CSSProperties
}

function Header(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

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
                {/* @TODO: Move btn and modal to the right places*/}
                <Button onClick={handleOpen} label="Followers/Following" />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle}>
                        <Followers />
                        <button
                            onClick={handleClose}
                            className={classes.closeBtn}
                        >
                            x
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Header
