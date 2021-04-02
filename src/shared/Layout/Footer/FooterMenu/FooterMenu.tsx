import React from 'react'
import { useTranslation } from 'react-i18next'

import useStyles from './FooterMenu.style'

const foooterMenu = [
    {
        label: 'More Satoshi',
        url: '',
    },
    {
        label: 'Privacy',
        url: '/privacy',
    },
    {
        label: 'Help',
        url: '/support-form',
    },
]

function FooterMenu(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div>
            {foooterMenu.map((menuItem, index) => {
                return (
                    <a
                        key={`${menuItem.label}-${index}`}
                        className={classes.link}
                        href={menuItem.url}
                    >
                        {t(menuItem.label)}
                    </a>
                )
            })}
        </div>
    )
}

export default FooterMenu
