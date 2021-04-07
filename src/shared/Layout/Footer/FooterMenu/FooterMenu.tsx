import React from 'react'
import { useTranslation } from 'react-i18next'

import useStyles from './FooterMenu.style'

const footerMenu = [
    {
        label: 'About Satoshi.Art',
        url: '/about-satoshi-art',
    },
    {
        label: 'Privacy',
        url: '/privacy',
    },
    {
        label: 'Support',
        url: '/support',
    },
    {
        label: 'Terms & Conditions',
        url: '/terms-and-conditions',
    },
]

function FooterMenu(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div>
            {footerMenu.map((menuItem, index) => {
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
