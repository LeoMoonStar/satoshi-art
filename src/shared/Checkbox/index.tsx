import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MUICheckbox, { CheckboxProps } from '@material-ui/core/Checkbox'
const useStyles = makeStyles(() => {
    const commonStyles: Record<string, string | number> = {
        position: 'relative',
        width: 16,
        height: 16,
        boxSizing: 'border-box',
        borderRadius: 2,
    }

    return {
        icon: {
            ...commonStyles,
            border: '2px solid #C4C4C4',
        },
        checkedIcon: {
            ...commonStyles,
            border: '2px solid #FF0099',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 8,
                height: 8,
                margin: '-4px 0 0 -4px',
                borderRadius: 2,
                backgroundColor: '#FF0099',
            },
        },
    }
})

interface CustomProps extends CheckboxProps {
    className?: string
}

export default function Checkbox({
    className,
    ...rest
}: CustomProps): JSX.Element {
    const classes = useStyles()

    return (
        <MUICheckbox
            checkedIcon={<span className={classes.checkedIcon} />}
            icon={<span className={classes.icon} />}
            {...rest}
        />
    )
}
