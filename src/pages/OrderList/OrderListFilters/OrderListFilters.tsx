import React from 'react';
import { MenuItem } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import text from '../../../constants/content';
import { EditIcon, CalendarIcon } from 'components/icons';
import Select from 'components/widgets/Select';

import useStyles from './OrderListFilters.style';

const dateOptions: any = ['today', 'lastWeek', 'lastMonth', 'lastYear'];
const statusOptions: any = ['allEvents', 'bid', 'buy', 'sell'];

export default function OrderListFilters(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.titleGroup}>
        <h1 className={classes.mainTitle}>Order List</h1>
        <div className={classes.infoText}>This is your order list data</div>
      </div>

      <Select
        defaultValue={0}
        className={classes.filter}
        renderValue={(value: any) => (
          <>
            <EditIcon className={classes.selectIcon} />
            {text[statusOptions[Number(value)]]}
            <ExpandMore />
          </>
        )}
      >
        {statusOptions.map((label: any, index: any) => (
          <MenuItem key={index} value={index}>
            {text[label]}
          </MenuItem>
        ))}
      </Select>
      <Select
        defaultValue={0}
        className={classes.filter}
        renderValue={(value: any) => (
          <>
            <CalendarIcon className={classes.selectIcon} />
            {text[dateOptions[Number(value)]]}
            <ExpandMore />
          </>
        )}
      >
        {dateOptions.map((label: any, index: any) => (
          <MenuItem key={index} value={index}>
            {text[label]}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
