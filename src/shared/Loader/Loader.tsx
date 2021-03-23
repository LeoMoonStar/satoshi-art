import React from 'react'
import { LoaderIcon } from 'shared/icons'
import useStyles from './Loader.style'

export default function Loader(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.loader}>
            <LoaderIcon />
        </div>
    )
}
