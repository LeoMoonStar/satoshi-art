import React from 'react'

import useStyles from './TopsItems.style'

type ItemsI = {
    value: string
    label: string
}

type TopsItemsProps = {
    items: ItemsI[]
}

function TopsItems({ items }: TopsItemsProps): JSX.Element {
    const classes = useStyles()

    return (
        <ul className={classes.topsItems}>
            {items.map(({ label, value }, index) => {
                return (
                    <li key={`${value}-${index}`} className={classes.item}>
                        {label}
                    </li>
                )
            })}
        </ul>
    )
}

export default TopsItems
