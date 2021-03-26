import React from 'react'
import MUIButton, { ButtonProps } from '@material-ui/core/Button'

interface CustomProps extends ButtonProps {
    label?: string
}

function Button({
    children,
    className,
    label,
    onClick,
    ...rest
}: CustomProps): JSX.Element {
    return (
        <MUIButton className={className} onClick={onClick} {...rest}>
            {label || children}
        </MUIButton>
    )
}

export default Button
