import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { FullLogo, HouseIcon, OrderDetailsIcon, LogOutIcon } from 'shared/icons'
import useStyles from './Sidebar.style'

const navItems = [
    {
        id: 1,
        label: 'dashboard',
        href: '/dashboard/dashboard-list',
        Icon: HouseIcon,
    },
    {
        id: 2,
        label: 'orderList',
        href: '/dashboard/order-list',
        Icon: OrderDetailsIcon,
    },
]

function Header(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <Link to="/" className={classes.brand}>
                <FullLogo />
            </Link>
            <nav>
                {navItems.map(({ id, label, href, Icon }) => (
                    <NavLink
                        to={href}
                        activeClassName={classes.navItemActive}
                        key={id}
                        className={classes.navItem}
                    >
                        <Icon />
                        {t(label)}
                    </NavLink>
                ))}
                <button type="button" className={classes.navItem}>
                    {/* todo: change icon logOut to disconnect */}
                    <LogOutIcon />
                    {t('disconnect')}
                </button>
            </nav>
        </div>
    )
}

export default Header
