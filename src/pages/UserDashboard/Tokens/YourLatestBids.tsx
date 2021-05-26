import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import text from '../../../../public/content';
import { ViewsIcon, EditIcon, TrashIcon } from 'components/icons';
import preview from 'components/images/artist/work.jpg';
import useStyles from './Tokens.style';
import TokensSlider from './TokensSlider';
import TokenCard from './TokenCard';

const mockTokens = Array.from({ length: 10 }, index => ({
  id: index,
  preview,
  name: 'Fresh Meat #F',
  author: {
    image: '',
    name: 'Fimbim',
    price: '124.56x3 ETH',
  },
  metadata: { payload: '' },
}));

const RenderCardContent = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.head}>
        <h3 className={classes.tokenName}>Fresh MEar #F</h3>
      </div>
      <div className={classes.userInfo}>
        <Link to='/'>@Fimbim</Link>
        <span>124.56x3 ETH</span>
      </div>
      <div className={classes.controls}>
        <button type='button' className={cx(classes.controlButton, classes.viewButton)}>
          <div>
            <ViewsIcon />
          </div>
          <span>{text['viewBid']}</span>
        </button>
        <button type='button' className={cx(classes.controlButton, classes.editButton)}>
          <div>
            <EditIcon />
          </div>
          <span>{text['editBid']}</span>
        </button>
        <button type='button' className={cx(classes.controlButton, classes.cancelBid)}>
          <div>
            <TrashIcon />
          </div>
          <span>{text['cancelBid']}</span>
        </button>
      </div>
    </>
  );
};

export default function YourLatestBids(): JSX.Element {
  return (
    <TokensSlider title={text['yourLatestBids']} count={mockTokens.length}>
      {mockTokens.map((token: any) => (
        <TokenCard key={token.id} token={token} renderContent={RenderCardContent} />
      ))}
    </TokensSlider>
  );
}
