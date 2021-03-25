import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import Button from 'shared/Button'
import ConnectButton from 'shared/ConnectButton'
import { LogoIcon } from 'shared/icons'
import useStyles from './HeaderFull.style'

const navItems = [
    { id: 1, label: 'howItWorks', href: '/' },
    { id: 2, label: 'community', href: '/' },
    { id: 3, label: 'Following', href: '/' },
]

export default function HeaderFull(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <header className={classes.container}>
            <div className={classes.topRow}>
                <div className={classes.logo}>
                    <LogoIcon />
                </div>

                <nav className={classes.navigation}>
                    {navItems.map(({ id, label, href }) => (
                        <NavLink key={id} to={href}>
                            {t(label)}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className={classes.bottomRow}>
                <div className={classes.buttons}>
                    <ConnectButton />

                    <Link
                        to="/create-collectible"
                        className={classes.createLink}
                    >
                        <Button
                            label={t('create')}
                            className={classes.createBtn}
                        />
                    </Link>
                </div>
            </div>
        </header>
    )
}
