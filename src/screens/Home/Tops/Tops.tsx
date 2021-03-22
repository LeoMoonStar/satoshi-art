import React from 'react'

import TopsItems from './TopsItems'
import useStyles from './Tops.style'

type ItemsI = {
    value: string
    label: string
}

type TopsItemI = {
    header: string
    label: string
    items: ItemsI[]
}

type TopsProps = {
    topsItems: TopsItemI[]
}

function Tops({ topsItems }: TopsProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.tops}>
            {topsItems.map(({ label, header, items }, index) => {
                return (
                    <div key={`${label}-${index}`} className={classes.topsItem}>
                        <div className={classes.topsHeader}>{header}</div>
                        <TopsItems items={items} />
                    </div>
                )
            })}
        </div>
    )
}

export default Tops
