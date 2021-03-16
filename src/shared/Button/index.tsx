import React from 'react'
import MUIButton, { ButtonProps } from '@material-ui/core/Button'

interface CustomProps extends ButtonProps {
    label: string
}

function Button(props: CustomProps): JSX.Element {
    return <MUIButton className={props.className}>{props.label}</MUIButton>
}

export default Button
