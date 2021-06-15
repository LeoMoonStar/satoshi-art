import React from 'react';
import text from '../../../constants/content';
import cx from 'classnames';
import _ from 'lodash';
import { DoubleArrowLeft } from 'components/icons';

import useStyles from './Pagination.style';
import { useEffect } from 'react';
import { setGridPageSizeActionCreator } from '@material-ui/data-grid';

type PaginationProps = {
  className?: string;
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: any;
};


export default function Pagination({
  className,
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps): JSX.Element {
  const classes = useStyles();
  console.log("In Pagination: ", itemsCount, pageSize)
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // if (pagesCount === 1) return null as any;
  // const pages = _.range(1, pagesCount + 1);
  const generatePageButton = (pages: number) => {
    const content = [];
    for (let i = 1; i <= pages; i++) {
      content.push(<li>
        <button type='button' onClick={() => onPageChange(currentPage = i)}>{i}</button>
      </li>
      );
    }
    return content;
  };
  return (
    <ul className={cx(classes.container, className)} style={{ maxWidth: '250px', alignItems: 'right' }}>
      <li className={classes.first}>
        <button type='button' title={text['first']}>
          <DoubleArrowLeft onClick={() => { pagesCount != 0 && currentPage > 0 ? onPageChange(currentPage - 1) : null }} />
        </button>
      </li>
      {generatePageButton(pagesCount)}
      <li className={classes.last}>
        <button type='button' title={text['last']} >
          <DoubleArrowLeft onClick={() => onPageChange(currentPage + 1)} />
        </button>
      </li>
    </ul>
  );
}
