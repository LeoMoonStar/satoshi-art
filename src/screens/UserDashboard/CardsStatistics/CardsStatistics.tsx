import React from 'react'
import {
    BidsLostIcon,
    BidsWonIcon,
    DecreaseIcon,
    IncreaseIcon,
    TotalBidsIcon,
} from 'shared/icons/dashboard'

import useStyles from './CardsStatistics.style'

const items = [
    {
        id: 1,
        amount: 357,
        icon: <TotalBidsIcon />,
        title: 'Total Bids ',
        update: 4,
    },
    {
        id: 2,
        amount: 57,
        icon: <BidsWonIcon />,
        title: 'Total Bids',
        update: 12,
    },
    {
        id: 3,
        amount: 300,
        icon: <BidsLostIcon />,
        title: 'Bids Won ',
        update: -25,
    },
    {
        id: 4,
        amount: 300,
        icon: <TotalBidsIcon />,
        title: 'Bids Lost',
        update: 25,
    },
]

type CardProps = {
    amount: number
    title: string
    icon: React.ReactNode
    update: number
}

const Card = ({ amount, title, icon, update }: CardProps) => {
    const classes = useStyles()

    return (
        <div className={classes.card}>
            <div className={classes.cardIcon}>{icon}</div>
            <div className={classes.info}>
                <div className={classes.amount}>{amount}</div>
                <h3 className={classes.title}>{title}</h3>
                <span className={classes.helpText}>
                    {update < 0 ? <DecreaseIcon /> : <IncreaseIcon />}
                    {update}% (30 days)
                </span>
            </div>
        </div>
    )
}

export default function CardsStatistics(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            {items.map(({ id, ...props }) => (
                <Card key={id} {...props} />
            ))}
        </div>
    )
}
