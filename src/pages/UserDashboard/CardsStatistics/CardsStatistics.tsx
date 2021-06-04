import React from 'react';
import text from '../../../constants/content';
import { BidsLostIcon, BidsWonIcon, DecreaseIcon, IncreaseIcon, TotalBidsIcon } from 'components/icons/dashboard';

import useStyles from './CardsStatistics.style';

const items = [
  { id: 1, amount: 357, icon: <TotalBidsIcon />, title: 'totalBids', update: 4 },
  { id: 2, amount: 57, icon: <BidsWonIcon />, title: 'bidsWon', update: 12 },
  { id: 3, amount: 300, icon: <BidsLostIcon />, title: 'bidsLost', update: -25 },
];

type CardProps = {
  amount: number;
  title: string;
  icon: React.ReactNode;
  update: number;
};

const Card = ({ amount, title, icon, update }: CardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.cardIcon}>{icon}</div>
      <div className={classes.info}>
        <div className={classes.amount}>{amount}</div>
        <h3 className={classes.title}>{text[title]}</h3>
        <span className={classes.helpText}>
          {update < 0 ? <DecreaseIcon /> : <IncreaseIcon />}
          {update}% {text['daysCountInBrackets'] + '30'}
        </span>
      </div>
    </div>
  );
};

export default function CardsStatistics(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {items.map(({ id, ...props }) => (
        <Card key={id} {...props} />
      ))}
    </div>
  );
}
