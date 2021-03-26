import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MUIButton, { ButtonProps } from '@material-ui/core/Button'
import cx from 'classnames'

const useStyles = makeStyles(() => {
    return {
        action: {
            lineHeight: '40px',
            padding: 0,
            color: '#fff',
            borderRadius: 60,
            backgroundColor: '#ff0099',
            textTransform: 'initial',
            '&:not(:disabled):hover': {
                backgroundColor: '#ff009990',
            },
            '&:disabled': {
                backgroundColor: '#C4C4C4',
                color: '#fff',
            },
        },
        none: {},
    }
})

interface CustomProps extends ButtonProps {
    label?: string
    variant?: any // todo: any
    minWidth?: number
}
// todo: reuse this button where you need it

function Button({
    children,
    className,
    label,
    onClick,
    minWidth = 157,
    variant = 'none',
    ...rest
}: CustomProps): JSX.Element {
    const classes = useStyles()
    const key: keyof typeof classes = variant

    return (
        <MUIButton
            className={cx(className, classes[key])}
            onClick={onClick}
            style={{ minWidth }}
            {...rest}
        >
            {label || children}
        </MUIButton>
    )
}

export default Button
