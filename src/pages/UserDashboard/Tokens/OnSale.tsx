import React, { useState, useRef } from 'react';
import { IconButton } from '@material-ui/core';
import { Popover } from '@material-ui/core';
import text from '../../../constants/content';
import { ShowMoreIcon } from 'components/icons';
import { EditIcon, RemoveIcon, TransferIcon, BurnIcon } from 'components/icons/dashboard';
import useStyles from './Tokens.style';
import TokensSlider from './TokensSlider';
import TokenCard from './TokenCard';
import { getTokens, Token } from '../../../apis/token';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { TokenType } from 'state/transactions/actions';
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
                  <EditIcon />
                </div>
                {text['changePrice']}
              </button>
              <button type='button'>
                <div>
                  <RemoveIcon />
                </div>
                {text['removeFromSale']}
              </button>
              <button type='button'>
                <div>
                  <TransferIcon />
                </div>
                {text['transferToken']}
              </button>
              <button type='button'>
                <div>
                  <BurnIcon />
                </div>
                {text['burnToken']}
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

export default function OnSale({ isOutOfDate }: { isOutOfDate: boolean }): JSX.Element | null {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { account } = useWeb3React();

  useEffect(() => {
    if (!account || !isOutOfDate) return;

    /*getTokens({
            walletHash: account,
            status: TokenStatus.waitForSale,
        }).then((tokens) => {
            setTokens(tokens)
            setLoading(false)
        })*/
  }, [account, isOutOfDate]);

  return (
    <TokensSlider isLoading={isLoading} count={tokens.length} title={text['onSale']}>
      {tokens.map((token: any) => (
        <TokenCard key={token.id} token={token} renderContent={RenderCardContent} />
      ))}
    </TokensSlider>
  );
}
