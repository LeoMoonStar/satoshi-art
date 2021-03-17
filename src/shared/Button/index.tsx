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
}: CustomProps): JSX.Element {
    return (
        <MUIButton className={className} onClick={onClick}>
            {label || children}
        </MUIButton>
    )
}

export default Button
