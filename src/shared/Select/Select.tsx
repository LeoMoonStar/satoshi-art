import React from 'react'
import {
    Select as MUISelect,
    SelectProps as MUISelectProps,
} from '@material-ui/core'
import useStyles from './Select.style'

interface SelectProps {
    renderValue?: (value: MUISelectProps['value']) => React.ReactNode
    label?: string
    defaultValue?: string | number
    className?: string
    children: React.ReactNode
}

export default function Select({
    renderValue = (value) => <>{value}</>,
    label,
    children,
    defaultValue,
    className = '',
}: SelectProps): JSX.Element {
    const classes = useStyles()
    return (
        <MUISelect
            label={label}
            className={className}
            defaultValue={defaultValue}
            classes={{
                root: classes.select,
                icon: classes.iconSelect,
            }}
            MenuProps={{
                classes: {
                    paper: classes.paper,
                    list: classes.list,
                },
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
                getContentAnchorEl: null,
            }}
            disableUnderline
            renderValue={renderValue}
        >
            {children}
        </MUISelect>
    )
}
