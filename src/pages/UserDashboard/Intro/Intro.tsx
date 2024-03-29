import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { IconButton } from '@material-ui/core';
import text from '../../../constants/content';
import { CalendarIcon } from '../../../components/icons/dashboard';
import { AngleDownIcon, RoundedAngleLeftIcon } from '../../../components/icons';
import Button from '../../../components/button';
import { readCookie } from 'apis/cookie'
import { getUserInfo } from 'apis/users'

import useStyles from './Intro.style';
import { Popover } from '@material-ui/core';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const convertDateToSting = (date: Date): string => {
  if (!date) return '';

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function CardsStatistics({setSearchPeriod}:{setSearchPeriod:any}): JSX.Element {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isOpenFilter, setOpenFilter] = useState<boolean>(false);
  const anchorElRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [name, setName] = useState('')
  const id = readCookie("id")

  const onChange = (dates: [Date, Date]): void => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // console.log("in canlander:",startDate.getTime(), endDate.getTime())
  };

  const handleDone = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setOpenFilter(false);
    setSearchPeriod(startDate.getTime(),endDate.getTime());

    console.log("in canlander:",startDate.getTime(), endDate.getTime())

  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setOpenFilter(false);
  };

  useEffect(() => {
      if (id) {
          getUserInfo(id)
              .then(({ data }) => setName(data.name))
      }
  })

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.mainTitle}>{text['dashboard']}</div>
        <div className={classes.subTitle}>{text['hiWelcomeBackToDashboard']} {name}</div>
      </div>
      <div className={classes.datepickerFieldGroup} onClick={() => setOpenFilter(true)} ref={anchorElRef}>
        <div className={classes.dateIcon}>
          <CalendarIcon />
        </div>
        <div>
          <div className={classes.datepickerTitle}>
            {text['filterPeriod']}
            <AngleDownIcon />
          </div>
          <div className={classes.timeRange}>
            {convertDateToSting(startDate)} - {convertDateToSting(endDate)}
          </div>
        </div>
      </div>

      <Popover
        anchorEl={anchorElRef?.current}
        classes={{ paper: classes.controlsPaper }}
        open={isOpenFilter}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                  <IconButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    <RoundedAngleLeftIcon />
                  </IconButton>

                  <div className={classes.month}>{months[date.getMonth()]}</div>

                  <IconButton className={classes.nextArrow} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    <RoundedAngleLeftIcon />
                  </IconButton>
                </div>
              );
            }}
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <div className={classes.buttonsRow}>
            <Button className={classes.cancelBtn} onClick={handleCancel}>
              {text['cancel']}
            </Button>
            <Button onClick={handleDone} className={classes.doneBtn} variantCustom='action'>
              {text['done']}
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
