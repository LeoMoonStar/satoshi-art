import React from 'react';
import text from '../../../constants/content';
import cx from 'classnames';
import _ from 'lodash';
import { DoubleArrowLeft } from 'components/icons';

import useStyles from './Pagination.style';
import { useEffect } from 'react';

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
  let pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null as any;
  const pages = _.range(1, pagesCount + 1);
  console.log('pagination',pagesCount)

  return (
    <ul className={cx(classes.container, className)} style={{maxWidth:'250px', alignItems:'right'}}>
      <li className={classes.first}>
        <button type='button' title={text['first']}>
          <DoubleArrowLeft onClick={() => { pagesCount!=0 ? onPageChange(pagesCount-1):null}}/>
        </button>
      </li>

      {/* {pages.map(page => (
      
        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
          <a className='page-link' onClick={() => onPageChange(page)}>
          <button type='button'>{page}</button>
          </a>
        </li>
      ))} */}
      
      <li>
        <button type='button'onClick={() => onPageChange(pagesCount=1)}>1</button>
      </li>

      <li>
        <button type='button' onClick={() => onPageChange(pagesCount=2)}>2</button>
      </li>

      <li >
        <button type='button' onClick={() => onPageChange(pagesCount=3)}>3</button>
      </li>

      <li>
        <button type='button'onClick={() => onPageChange(pagesCount=4)}>4</button>
      </li>
      <li className={classes.last}>
        <button type='button' title={text['last']} >
          <DoubleArrowLeft onClick={() => onPageChange(pagesCount+1)}/>
        </button>
      </li>
    </ul>
  );
}
