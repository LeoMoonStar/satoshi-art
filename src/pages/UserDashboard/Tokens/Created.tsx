import React, { useState, useRef, useEffect, useMemo } from 'react';
import text from '../../../constants/content';
import { IconButton } from '@material-ui/core';
import { Popover } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShowMoreIcon } from 'components/icons';
import { TransferIcon, BurnIcon, PriceIcon, RemoveIcon } from 'components/icons/dashboard';
import useStyles from './Tokens.style';
import TokensSlider from './TokensSlider';
import TokenCard from './TokenCard';
import { Token } from 'apis/token'
import { useWeb3React } from '@web3-react/core';
import PutOnSaleModal from './TokenActions/PutOnSaleModal';
import Price from 'components/widgets/Price';
import preview from 'components/images/artist/work.jpg';
import { getOnSaleCollectibles, getCollectible } from 'apis/collectibles'
import { getUserInfo } from 'apis/users'
import { readCookie } from 'apis/cookie'

const RenderCardContent = ({ token, onPutOnSale }: { token: any; onPutOnSale: (token: any) => any }) => {
  const classes = useStyles();

  const { payload, type } = token?.metadata;
  const anchorElRef = useRef();
  const [isOpen, setOpen] = useState<boolean>(false);


  return (
    <>
      <div className={classes.head}>
        <h3 className={classes.tokenName}>{token.name}</h3>
          {/*<IconButton className={classes.showMoreButton} buttonRef={anchorElRef}
              onClick={(e) => {
                  e.preventDefault()

                  setOpen(!isOpen)
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
                      {tokenStatus !== null && tokenStatus === 'onSale' ?
                          <button type="button" onClick={() => alert('Remove')}><div><RemoveIcon /></div>{t('Remove from sale')}</button>
                          :
                          <button type="button" onClick={() => onPutOnSale(token)}><div><PriceIcon /></div>{t('setAPrice')}</button>
                      }
                      <button type="button"><div><TransferIcon /></div>{t('transferToken')}</button>
                      <button type="button"><div><BurnIcon /></div>{t('burnToken')}</button>
                  </div>
              </Popover>
          </IconButton>*/}
      </div>

      {/*type === TokenType.MULTIPLE && (
        <div className={classes.count}>
          {payload?.copiesCount} of {payload?.copiesCount}
        </div>
      )*/}

      {/*<div className={classes.createdInfo}>
        <Link to='/artists/1'>@Coll3ctor</Link> {token.price && <Price.WeiToEth value={token.price} />}
      </div>*/}
    </>
  );
};

export default function Created({ setOutOfDatesSliders }: { setOutOfDatesSliders: (value: Record<any, boolean>) => void }): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { account } = useWeb3React();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [isPutOnSale, setPutOnSale] = useState<boolean>(false);
  const userId = readCookie("id")
  const [created, setCreated] = useState([])

  useEffect(() => {
      if (userId) {
          getOnSaleCollectibles(userId, 8, 1, 2, "creator")
              .then(({ data }) => {
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

                  setCreated(list)
              })
      }
  })
  
  const renderContent = useMemo(() => {
    const handlePutOnSale = (token: any) => {
      setPutOnSale(true);
      setSelectedToken(token);
    };
    return function RenderCardContentWithHandlers(props: any) {
      return <RenderCardContent {...props} onPutOnSale={handlePutOnSale} />;
    };
  }, [setSelectedToken]);

  return (
    <>
      <TokensSlider isLoading={isLoading} count={created.length} title={text['created']}>
        {created.map((token: any) => <TokenCard key={token.id} token={token} renderContent={renderContent} />)}
      </TokensSlider>
      {selectedToken !== null && isPutOnSale && <PutOnSaleModal onSuccess={() => setOutOfDatesSliders({ onSale: true })} token={selectedToken} onClose={() => setPutOnSale(false)}/>}
    </>
  );
}
