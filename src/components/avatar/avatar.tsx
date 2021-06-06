import React from 'react';
import clsx from 'clsx';
import { LogoIcon } from 'components/icons';
import artistStatus from 'components/images/artist/artistStatus.png';
import useStyles from './avatar.style';

type AvatarProps = {
  size?: number;
  image: string;
  alt?: string;
  status?: string | null;
  onClick?: () => void;
  className?: string;
};

export default function Avatar({
  size = 60,
  image,
  className = '',
  onClick,
  status = null,
}: AvatarProps): JSX.Element {
  const classes = useStyles();

  return (
    <div
      role={onClick ? 'button' : 'presentation'}
      className={clsx(classes.container, className, {
        [classes.pointer]: onClick,
      })}
      style={{ fontSize: size }}
      onClick={onClick}
    >
      {status && <img className={classes.status} src={artistStatus} alt={status} />}
      <img className={classes.image} src={image ? image : '/favicon.ico'} />
    </div>
  );
}
