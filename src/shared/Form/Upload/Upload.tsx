import React from 'react'
import cx from 'classnames'
import { Button } from '@material-ui/core'
import useStyles from './Upload.style'

type InputProps = {
    id: string
    accept: string
    className?: string
    register: any
    label?: string
}
export default function Upload({
    id,
    accept,
    label,
    className,
    register,
}: InputProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={cx(classes.wrapper, className)}>
            <input
                ref={register}
                accept={accept}
                id={id}
                name={id}
                type="file"
                hidden
            />
            {label && (
                <label htmlFor={id}>
                    <Button className={classes.btn} component="span">
                        {label}
                    </Button>
                </label>
            )}
        </div>
    )
}
