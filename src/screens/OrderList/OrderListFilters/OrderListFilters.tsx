import React from 'react'
import { MenuItem } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import { EditIcon, CalendarIcon } from 'shared/icons'
import Select from 'shared/Select'

import useStyles from './OrderListFilters.style'

const dateOptions: any = ['today', 'lastWeek', 'lastMonth', 'lastYear']
const statusOptions: any = ['allEvents', 'bid', 'buy', 'sell']

export default function OrderListFilters(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <div className={classes.titleGroup}>
                <h1 className={classes.mainTitle}>Order List</h1>
                <div className={classes.infoText}>
                    This is your order list data
                </div>
            </div>

            <Select
                defaultValue={0}
                className={classes.filter}
                renderValue={(value: any) => (
                    <>
                        <EditIcon className={classes.selectIcon} />
                        {t(statusOptions[Number(value)])}
                        <ExpandMore />
                    </>
                )}
            >
                {statusOptions.map((label: any, index: any) => (
                    <MenuItem key={index} value={index}>
                        {t(label)}
                    </MenuItem>
                ))}
            </Select>
            <Select
                defaultValue={0}
                className={classes.filter}
                renderValue={(value: any) => (
                    <>
                        <CalendarIcon className={classes.selectIcon} />
                        {t(dateOptions[Number(value)])}
                        <ExpandMore />
                    </>
                )}
            >
                {dateOptions.map((label: any, index: any) => (
                    <MenuItem key={index} value={index}>
                        {t(label)}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}
