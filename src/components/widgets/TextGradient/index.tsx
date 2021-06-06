import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'clsx';

const useStyles = makeStyles(() => {
  return {
    text: {
      display: 'inline-block',
      textTransform: 'initial',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  };
});

interface CustomProps {
  colors?: string;
  direction?: string;
  children: string;
  className?: string;
}

function Button({ colors = '#6A2FE7, #FF0099', direction = 'to left', children, className }: CustomProps): JSX.Element {
  const defaultClassName = useStyles();

  return (
    <span
      className={cx(className, defaultClassName.text)}
      style={{
        backgroundImage: `linear-gradient(${direction}, ${colors})`,
      }}
    >
      {children}
    </span>
  );
}

export default Button;
