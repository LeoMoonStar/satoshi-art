import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import text from '../../../constants/content';
import { ShowMoreIcon } from '../../../components/icons';
import { TransferIcon, BurnIcon, PriceIcon } from '../../../components/icons/dashboard';
import useStyles from './Tokens.style';
import TokensSlider from './TokensSlider';
import TokenCard from './TokenCard';
import { IconButton } from '@material-ui/core';
import { Popover } from '@material-ui/core';
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
      <div className={classes.head}>
        <h3 className={classes.tokenName}>{token.name.slice(0,35)+'...'}</h3>
        <IconButton className={classes.showMoreButton} buttonRef={anchorElRef}
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
                <div><TransferIcon /></div>
                <Link to={`/edit-collectible/${token.id}`} style={{ textDecoration: 'none' }}>{text['putOnSaleBtn']}</Link>
              </button>
              <button type='button'>
                <div><TransferIcon /></div>
                {text['putOnAuctionBtn']}
              </button>
              <button type='button'>
                <div><PriceIcon /></div>
                {text['changePriceBtn']}
              </button>
              <button type='button'>
                <div><BurnIcon /></div>
                {text['removeFromSaleBtn']}
              </button>
            </div>
          </Popover>
        </IconButton>
      </div>
      {/*type === 'multiple' && (
        <div className={classes.count}>
          {payload?.copiesCount} of {payload?.copiesCount}
        </div>
      )*/}
      {/*<div className={classes.highestBid}>
        Highest bid 1,995 ETH <br /> by <a href=''>@Coll3ctor</a>
      </div>*/}
    </>
  );
};

export default function Collections(): JSX.Element {
  const userId = readCookie("id")
  const [collections, setCollections] = useState([])
  
  useEffect(() => {
      if (userId) {
          getOnSaleCollectibles(userId, 8, 1, 2, "owner")
              .then((res) => {
                  const { data } = res
                  const list: any = []
                  console.log(data)
                  const getCollectibleUserInfo:any = [];
                  
                  data.forEach(async function (info: any) {
                    getCollectibleUserInfo.push(getCollectible(info.id))
                      // const collectible = await getCollectible(info.id)
                      // const creatorInfo = await getUserInfo(collectible.data.creatorUserId)

                      // const thumbnail = collectible.data.thumbnailUrl ? collectible.data.thumbnailUrl : '/collectible-image.jpeg'

                      // list.push({
                      //     id: info.id,
                      //     preview: thumbnail,
                      //     name: collectible.data.name,
                      //     author: { image: creatorInfo.data.thumbnailUrl, name: creatorInfo.data.name, price: info.price }
                      // })
                  })
                  Promise.all(getCollectibleUserInfo).then((result:any) => {
                    console.log(result);
                   
                    setCollections(result)
                  })

              })
      }
  }, [])
  // text['collections']
  return (
    <TokensSlider title='Collectibles' count={collections.length}>
      {collections.map(({data:token}: any) => {
        console.log(token)
        return (
      <TokenCard key={token.id} token={token} renderContent={RenderCardContent} />
      )})}
    </TokensSlider>
  );
}
