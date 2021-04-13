import React, { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { IconButton } from '@material-ui/core'

import { CalendarIcon } from 'shared/icons/dashboard'
import { AngleDownIcon, RoundedAngleLeftIcon } from 'shared/icons'
import Button from 'shared/Button'

import useStyles from './Intro.style'
import { Popover } from '@material-ui/core'

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

export default function CardsStatistics(): JSX.Element {
    const classes = useStyles()
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [isOpenFilter, setOpenFilter] = useState<boolean>(false)
    const anchorElRef: React.RefObject<HTMLDivElement> = useRef(null)

    const onChange = (dates: [Date, Date]): void => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const handleDone = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation()
        setOpenFilter(false)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation()
        setOpenFilter(false)
    }

    return (
        <div className={classes.container}>
            <div>
                <div className={classes.mainTitle}>Dashboard</div>
                <div className={classes.subTitle}>
                    Hi, Jown. Welcome back to your dashboard.
                </div>
            </div>
            <div
                className={classes.datepickerFieldGroup}
                onClick={() => setOpenFilter(true)}
                ref={anchorElRef}
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
            </div>

            <Popover
                anchorEl={anchorElRef?.current}
                classes={{
                    paper: classes.controlsPaper,
                }}
                open={isOpenFilter}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={() => setOpenFilter(false)}
                disableRestoreFocus
            >
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
                                <div className={classes.customDatePickerHeader}>
                                    <IconButton
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                    >
                                        <RoundedAngleLeftIcon />
                                    </IconButton>

                                    <div className={classes.month}>
                                        {months[date.getMonth()]}
                                    </div>

                                    <IconButton
                                        className={classes.nextArrow}
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
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
            </Popover>
        </div>
    )
}
