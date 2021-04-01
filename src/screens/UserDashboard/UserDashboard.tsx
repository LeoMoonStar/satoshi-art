import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { IconButton } from '@material-ui/core'

import 'react-datepicker/dist/react-datepicker.css'
import Button from 'shared/Button'
import { DashboardLayout } from 'shared/DashboardLayout'
import { CalendarIcon } from 'shared/icons/dashboard'
import { AngleDownIcon, RoundedAngleLeftIcon } from 'shared/icons'
import useStyles from './UserDashboard.style'

import CardsStatistics from './CardsStatistics'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const convertDateToSting = (date: Date): string => {
    if (!date) return ''

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

// todo: maybe use popover for the period filter popup

export default function UserDashboard(): JSX.Element {
    const classes = useStyles()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    const onChange = (dates: [Date, Date]): void => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const handleDone = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation()
        setOpen(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation()
        setOpen(false)
    }

    return (
        <DashboardLayout>
            <div className={classes.container}>
                <div className={classes.header}>
                    <div>
                        <div className={classes.mainTitle}>Dashboard</div>
                        <div className={classes.subTitle}>
                            Hi, Jown. Welcome back to your dashboard.
                        </div>
                    </div>
                    <div
                        className={classes.datepickerFieldGroup}
                        onClick={() => setOpen(true)}
                    >
                        <div className={classes.dateIcon}>
                            <CalendarIcon />
                        </div>
                        <div>
                            <div className={classes.datepickerTitle}>
                                Filter Period
                                <AngleDownIcon />
                            </div>
                            <div className={classes.timeRange}>
                                {convertDateToSting(startDate)} -
                                {convertDateToSting(endDate)}
                            </div>
                        </div>
                        {isOpen && (
                            <div className={classes.modal}>
                                <DatePicker
                                    renderCustomHeader={({
                                        date,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }: any): JSX.Element => {
                                        return (
                                            <div
                                                className={
                                                    classes.customDatePickerHeader
                                                }
                                            >
                                                <IconButton
                                                    onClick={decreaseMonth}
                                                    disabled={
                                                        prevMonthButtonDisabled
                                                    }
                                                >
                                                    <RoundedAngleLeftIcon />
                                                </IconButton>

                                                <div className={classes.month}>
                                                    {months[date.getMonth()]}
                                                </div>

                                                <IconButton
                                                    className={
                                                        classes.nextArrow
                                                    }
                                                    onClick={increaseMonth}
                                                    disabled={
                                                        nextMonthButtonDisabled
                                                    }
                                                >
                                                    <RoundedAngleLeftIcon />
                                                </IconButton>
                                            </div>
                                        )
                                    }}
                                    selected={startDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                />
                                <div className={classes.buttonsRow}>
                                    <Button
                                        className={classes.cancelBtn}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDone}
                                        className={classes.doneBtn}
                                        variantCustom="action"
                                    >
                                        Done
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <CardsStatistics />
            </div>
        </DashboardLayout>
    )
}
