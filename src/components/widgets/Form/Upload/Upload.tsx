import React from 'react';
import cx from 'classnames';
import { Button } from '@material-ui/core';
import useStyles from './Upload.style';

type InputProps = {
  id: string;
  accept: string;
  onChange: any;
  src: string;
  className?: string;
  register: any;
  label?: string;
};
export default function Upload({ id, accept, onChange, src, label, className, register }: InputProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={cx(classes.wrapper, className)}>
      <input ref={register} accept={accept} onChange={onChange} id={id} name={id} type='file' hidden />
      {src && (
        <div className={classes.imgHolder}>
          <img src={src} />
        </div>
      )}
      {label && (
        <label htmlFor={id}>
          <Button className={classes.btn} component='span'>
            {label}
          </Button>
        </label>
      )}
    </div>
  );
}
