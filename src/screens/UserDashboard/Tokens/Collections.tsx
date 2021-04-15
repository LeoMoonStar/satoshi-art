import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ShowMoreIcon } from 'shared/icons'
import { TransferIcon, BurnIcon, PriceIcon } from 'shared/icons/dashboard'
import useStyles from './Tokens.style'
import TokensSlider from './TokensSlider'
import TokenCard from './TokenCard'
import { IconButton } from '@material-ui/core'
import { Popover } from '@material-ui/core'
import { Token } from 'api/tokens'
import preview from 'shared/images/artist/work.jpg'

const RenderCardContent = ({ token }: { token: Token }) => {
    const classes = useStyles()
    const [isOpen, setOpen] = useState<boolean>(false)
    const anchorElRef = useRef()
    const { t } = useTranslation()
    const { payload, type } = token?.metadata

    return (
        <>
            <div className={classes.head}>
                <h3 className={classes.tokenName}>Fresh MEar #F</h3>
                <IconButton
                    className={classes.showMoreButton}
                    buttonRef={anchorElRef}
                    onClick={() => setOpen(!isOpen)}
                >
                    <ShowMoreIcon />
                    <Popover
                        anchorEl={anchorElRef?.current}
                        classes={{
                            paper: classes.controlsPaper,
                        }}
                        open={isOpen}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={() => setOpen(false)}
                        disableRestoreFocus
                    >
                        <div className={classes.controlsButtons}>
                            <button type="button">
                                <div>
                                    <TransferIcon />
                                </div>
                                {t('putOnSaleBtn')}
                            </button>
                            <button type="button">
                                <div>
                                    <TransferIcon />
                                </div>
                                {t('putOnAuctionBtn')}
                            </button>
                            <button type="button">
                                <div>
                                    <PriceIcon />
                                </div>
                                {t('changePriceBtn')}
                            </button>
                            <button type="button">
                                <div>
                                    <BurnIcon />
                                </div>
                                {t('removeFromSaleBtn')}
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
                Highest bid 1,995 ETH <br /> by <a href="">@Coll3ctor</a>
            </div>
        </>
    )
}

const mockTokens = Array.from({ length: 24 }, (index) => ({
    id: index,
    preview,
    name: 'Fresh Meat #F',
    author: {
        image: '',
        name: 'Fimbim',
        price: '124.56x3 ETH',
    },
}))

export default function Collections(): JSX.Element {
    const { t } = useTranslation()

    return (
        <TokensSlider title={t('collections')}>
            {mockTokens.map((token: any) => (
                <TokenCard
                    key={token._id}
                    token={token}
                    renderContent={RenderCardContent}
                />
            ))}
        </TokensSlider>
    )
}
