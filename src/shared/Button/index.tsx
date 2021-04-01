import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MUIButton, { ButtonProps } from '@material-ui/core/Button'
import cx from 'clsx'

type Variants = 'action' | 'outlined'

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
    variantCustom?: Variants
}

function Button({
    children,
    className,
    label,
    onClick,
    variantCustom,
    ...rest
}: CustomProps): JSX.Element {
    const variantClassName = useStyles()

    return (
        <MUIButton
            className={cx(
                className,
                variantClassName[variantCustom as Variants]
            )}
            onClick={onClick}
            {...rest}
        >
            {label || children}
        </MUIButton>
    )
}

export default Button
