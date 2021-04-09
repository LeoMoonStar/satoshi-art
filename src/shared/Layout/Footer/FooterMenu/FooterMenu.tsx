import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'shared/Button'

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
        label: 'Cookie privacy',
        url: '/cookie-privacy',
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

    useEffect(() => {
        const { cookieconsent } = window as any

        cookieconsent.run({
            notice_banner_type: 'standalone',
            consent_type: 'express',
            palette: 'dark',
            language: 'en',
            change_preferences_selector: '#changePreferences',
        })
    }, [])

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
            <Button
                id="changePreferences"
                className={classes.link}
                disableRipple
                disableFocusRipple
            >
                Change cookie preferences
            </Button>
        </div>
    )
}
export default FooterMenu
