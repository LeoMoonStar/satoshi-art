import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIButton, { ButtonProps } from '@material-ui/core/Button';
import cx from 'clsx';

type Variants = 'action' | 'outlined' | 'linkButton' | 'outlinedLink';

const commonButtonsStyles = (color: string): any => {
  return {
    minWidth: 157,
    lineHeight: '40px',
    padding: 0,
    color: '#fff',
    borderRadius: 60,
    backgroundColor: color,
    textTransform: 'initial',
    '&:not(:disabled):hover': {
      backgroundColor: `${color}90`,
    },
    '&:disabled': {
      backgroundColor: '#C4C4C4',
      color: '#fff',
    },
  };
};

const outlinedButtonStyles = (color: string): any => {
  return {
    width: 157,
    lineHeight: '40px',
    padding: 0,
    color: color,
    borderRadius: 60,
    border: `1px solid ${color}`,
    textTransform: 'initial',
    '&:not(:disabled):hover': {
      backgroundColor: `${color}20`,
    },
    '&:disabled': {
      border: '1px solid #C4C4C4',
      color: '#C4C4C4',
    },
  };
};

const useStyles = makeStyles(() => {
  return {
    action: {
      ...commonButtonsStyles('#ff0099'),
    },
    linkButton: {
      ...commonButtonsStyles('#5113D5'),
    },
    outlined: {
      ...outlinedButtonStyles('#ff0099'),
    },
    outlinedLink: {
      ...outlinedButtonStyles('#5113D5'),
    },
    none: {},
  };
});

interface CustomProps extends ButtonProps {
  label?: string;
  variantCustom?: Variants;
}

const Button = ({ children, className, label, onClick, variantCustom, ...rest }: CustomProps): JSX.Element => {
  const variantClassName = useStyles();

  return (
    <MUIButton className={cx(className, variantClassName[variantCustom as Variants])} onClick={onClick} {...rest}>
      {label || children}
    </MUIButton>
  );
};

export default Button;
