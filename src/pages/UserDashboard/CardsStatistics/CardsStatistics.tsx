import React, { useState, useEffect } from 'react';
import text from '../../../constants/content';
import { BidsLostIcon, BidsWonIcon, DecreaseIcon, IncreaseIcon, TotalBidsIcon } from 'components/icons/dashboard';
import { getBidStatistics } from 'apis/users'
import useStyles from './CardsStatistics.style';

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
  const [totalBids, setTotalBids] = useState(0)
  const [bidsWon, setBidsWon] = useState(0)
  const [bidsLost, setBidsLost] = useState(0)
  const items = [
    { id: 1, amount: totalBids, icon: <TotalBidsIcon />, title: 'totalBids', update: 4 },
    { id: 2, amount: bidsWon, icon: <BidsWonIcon />, title: 'bidsWon', update: 12 },
    { id: 3, amount: bidsLost, icon: <BidsLostIcon />, title: 'bidsLost', update: -25 },
  ];
  useEffect(() => {
    getBidStatistics().then((data)=>{
      setTotalBids(data.data.totalNumberOfBidItems)
      setBidsWon(data.data.totalNumberOfBidWons)
      setBidsLost(data.data.totalNumberOfBidLosts)
    }).catch(error => console.error(error.message));
  }, [])
  return (
    <div className={classes.container}>
      {items.map(({ id, ...props }) => (
        <Card key={id} {...props} />
      ))}
    </div>
  );
}
