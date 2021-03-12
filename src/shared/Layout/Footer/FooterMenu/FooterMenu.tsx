import React from 'react'

import useStyles from './FooterMenu.style'

const foooterMenu = [
    {
        label: 'More Satoshi',
        url: '',
    },
    {
        label: 'Privacy',
        url: '',
    },
    {
        label: 'Community',
        url: '',
    },
    {
        label: 'Help',
        url: '',
    },
    {
        label: 'Cookie preferences',
        url: '',
    },
    {
        label: 'Blog',
        url: '',
    },
]

function FooterMenu(): JSX.Element {
    const classes = useStyles()

    return (
        <div>
            {foooterMenu.map((menuItem, index) => {
                return (
                    <a
                        key={`${menuItem.label}-${index}`}
                        className={classes.link}
                        href={menuItem.url}
                    >
                        {menuItem.label}
                    </a>
                )
            })}
        </div>
    )
}

export default FooterMenu
