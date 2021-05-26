import React from 'react'
import {
    Input as MuiInput,
    InputProps as MuiInputProps,
} from '@material-ui/core'
import useStyles from './Input.style'

interface InputProps extends MuiInputProps {
    id: string
    placeholder: string
    label: React.ReactNode
    register: any
}
export default function Input({
    id,
    placeholder,
    label,
    register,
    ...rest
}: InputProps): JSX.Element {
    const classes = useStyles()
    return (
        <div className={classes.input}>
            <label htmlFor={id} className={classes.label}>
                {label}
            </label>
            <MuiInput
                id={id}
                placeholder={placeholder}
                inputRef={register}
                name={id}
                disableUnderline
                {...rest}
            />
        </div>
    )
}
