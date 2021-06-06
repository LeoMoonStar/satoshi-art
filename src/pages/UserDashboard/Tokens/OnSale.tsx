import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import { Popover } from '@material-ui/core';
import text from '../../../constants/content';
import { ShowMoreIcon } from 'components/icons';
import { EditIcon, RemoveIcon, TransferIcon, BurnIcon } from 'components/icons/dashboard';
import useStyles from './Tokens.style';
import TokensSlider from './TokensSlider';
import TokenCard from './TokenCard';
import { useWeb3React } from '@web3-react/core';
import preview from 'components/images/artist/work.jpg';
import { getOnSaleCollectibles, getCollectible } from 'apis/collectibles'
import { getUserInfo } from 'apis/users'
import { readCookie } from 'apis/cookie'

const RenderCardContent = ({ token }: any) => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);
  const anchorElRef = useRef();

  return (
    <>
      <Link style={{ textDecoration: 'none' }} to={`/edit-collectible/${token.id}`}>
        <div className={classes.head}>
          <h3 className={classes.tokenName}>{token.name}</h3>
          {/*<IconButton className={classes.showMoreButton} buttonRef={anchorElRef} onClick={e => {
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
                  <div><EditIcon /></div>
                  {text['changePrice']}
                </button>
                <button type='button'>
                  <div><RemoveIcon /></div>
                  {text['removeFromSale']}
                </button>
                <button type='button'>
                  <div><TransferIcon /></div>
                  {text['transferToken']}
                </button>
                <button type='button'>
                  <div><BurnIcon /></div>
                  {text['burnToken']}
                </button>
              </div>
            </Popover>
          </IconButton>*/}
        </div>
        {/*type === 'multiple' && (
          <div className={classes.count}>
            {payload?.copiesCount} of {payload?.copiesCount}
          </div>
        )*/}
        {/*<div className={classes.highestBid}>
          Highest bid 1,995 ETH <br /> by <a href=''>@Coll3ctor</a>
        </div>*/}
      </Link>
    </>
  );
};

export default function OnSale({ isOutOfDate }: { isOutOfDate: boolean }): JSX.Element | null {
  const [isLoading, setLoading] = useState<boolean>(true);
  const userId = readCookie("id")
    const [onsale, setOnsale] = useState([])

  useEffect(() => {
      if (userId) {
          getOnSaleCollectibles(userId, 8, 1, 1, "owner")
              .then((res) => {
                  const { data } = res
                  const list: any = []

                  data.forEach(async function (info: any) {
                      const collectible = await getCollectible(info.id)
                      const creatorInfo = await getUserInfo(collectible.data.creatorUserId)

                      list.push({
                          id: info.id,
                          preview: collectible.data.thumbnailUrl,
                          name: collectible.data.name,
                          author: { image: creatorInfo.data.thumbnailUrl, name: creatorInfo.data.name, price: info.price }
                      })
                  })

                  setOnsale(list)
              })
      }
  })

  return (
    <TokensSlider isLoading={isLoading} count={onsale.length} title={text['onSale']}>
      {onsale.map((token: any) => <TokenCard key={token.id} token={token} renderContent={RenderCardContent} />)}
    </TokensSlider>
  );
}
