import React from 'react';
import text from '../../../constants/content';
import cx from 'classnames';

import { DoubleArrowLeft } from 'components/icons';

import useStyles from './Pagination.style';

type PaginationProps = {
  className?: string;
};

export default function Pagination({ className }: PaginationProps): JSX.Element {
  const classes = useStyles();

  return (
    <ul className={cx(classes.container, className)}>
      <li className={classes.first}>
        <button type='button' title={text['first']}>
          <DoubleArrowLeft />
        </button>
      </li>

      <li>
        <button type='button'>1</button>
      </li>

      <li>
        <button type='button'>2</button>
      </li>

      <li className={classes.active}>
        <button type='button'>3</button>
      </li>

      <li>
        <button type='button'>4</button>
      </li>
      <li className={classes.last}>
        <button type='button' title={text['last']}>
          <DoubleArrowLeft />
        </button>
      </li>
    </ul>
  );
}
