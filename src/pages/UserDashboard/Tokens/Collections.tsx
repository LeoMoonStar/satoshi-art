import React, { useState, useRef } from 'react';
import text from '../../../constants/content';
import { ShowMoreIcon } from '../../../components/icons';
import { TransferIcon, BurnIcon, PriceIcon } from '../../../components/icons/dashboard';
import useStyles from './Tokens.style';
import TokensSlider from './TokensSlider';
import TokenCard from './TokenCard';
import { IconButton } from '@material-ui/core';
import { Popover } from '@material-ui/core';
import { Token } from 'apis/token';
import preview from 'components/images/artist/work.jpg';

const RenderCardContent = ({ token }: { token: Token }) => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);
  const anchorElRef = useRef();

  const { payload, type } = token?.metadata;

  return (
    <>
      <div className={classes.head}>
        <h3 className={classes.tokenName}>{payload}</h3>
        <IconButton
          className={classes.showMoreButton}
          buttonRef={anchorElRef}
          onClick={e => {
            setOpen(!isOpen);

            e.preventDefault();
          }}
        >
          <ShowMoreIcon />
          <Popover
            anchorEl={anchorElRef?.current}
            classes={{ paper: classes.controlsPaper }}
            open={isOpen}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            onClose={() => setOpen(false)}
            disableRestoreFocus
          >
            <div className={classes.controlsButtons}>
              <button type='button'>
                <div>
                  <TransferIcon />
                </div>
                {text['putOnSaleBtn']}
              </button>
              <button type='button'>
                <div>
                  <TransferIcon />
                </div>
                {text['putOnAuctionBtn']}
              </button>
              <button type='button'>
                <div>
                  <PriceIcon />
                </div>
                {text['changePriceBtn']}
              </button>
              <button type='button'>
                <div>
                  <BurnIcon />
                </div>
                {text['removeFromSaleBtn']}
              </button>
            </div>
          </Popover>
        </IconButton>
      </div>
      {type === 'multiple' && (
        <div className={classes.count}>
          {payload?.copiesCount} of {payload?.copiesCount}
        </div>
      )}
      <div className={classes.highestBid}>
        Highest bid 1,995 ETH <br /> by <a href=''>@Coll3ctor</a>
      </div>
    </>
  );
};

const tokens = Array.from({ length: 24 }, index => ({
  id: index,
  preview,
  name: 'Fresh Meat #F',
  author: { image: '', name: 'Fimbim', price: '124.56x3 ETH' },
  metadata: { payload: 'Fresh MEar #F' },
}));

export default function Collections(): JSX.Element {
  return (
    <TokensSlider title={text['collections']} count={tokens.length}>
      {tokens.map((token: any) => (
        <TokenCard key={token.id} token={token} renderContent={RenderCardContent} />
      ))}
    </TokensSlider>
  );
}
