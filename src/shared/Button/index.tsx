import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MUIButton, { ButtonProps } from '@material-ui/core/Button'
import cx from 'classnames'

const useStyles = makeStyles(() => {
    return {
        action: {
            minWidth: 157,
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
        outlined: {
            width: 157,
            lineHeight: '40px',
            padding: 0,
            color: '#ff0099',
            borderRadius: 60,
            border: '1px solid #ff0099',
            textTransform: 'initial',
            '&:not(:disabled):hover': {
                backgroundColor: '#ff009920',
            },
            '&:disabled': {
                border: '1px solid #C4C4C4',
                color: '#C4C4C4',
            },
        },
        none: {},
    }
})

interface CustomProps extends ButtonProps {
    label?: string
    variant?: any // todo: any
}
// todo: reuse this button where you need it

function Button({
    children,
    className,
    label,
    onClick,
    variant = 'none',
    ...rest
}: CustomProps): JSX.Element {
    const classes = useStyles()
    const key: keyof typeof classes = variant

    return (
        <MUIButton
            className={cx(className, classes[key])}
            onClick={onClick}
            {...rest}
        >
            {label || children}
        </MUIButton>
    )
}

export default Button
