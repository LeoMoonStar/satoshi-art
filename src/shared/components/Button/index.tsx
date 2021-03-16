import React from 'react'
import MUIButton, { ButtonProps } from '@material-ui/core/Button'

interface CustomProps extends ButtonProps {
    label?: string
    onClick?: () => void
}

function Button(props: CustomProps): JSX.Element {
    return (
        <MUIButton className={props.className} onClick={props.onClick}>
            {props.label}
        </MUIButton>
    )
}

export default Button
