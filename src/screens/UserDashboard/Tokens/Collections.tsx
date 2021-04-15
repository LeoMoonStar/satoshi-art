import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'

import Loader from 'shared/Loader'
import { ShowMoreIcon } from 'shared/icons'
import { TransferIcon, BurnIcon, PriceIcon } from 'shared/icons/dashboard'
import useStyles from './Tokens.style'
import TokensSlider from './TokensSlider'
import TokenCard from './TokenCard'
import { IconButton } from '@material-ui/core'
import { Popover } from '@material-ui/core'
import { getTokens, Token } from 'api/tokens'

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

export default function Collections(): JSX.Element {
    const { t } = useTranslation()
    const [tokens, setTokens] = useState<Token[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const { account } = useWeb3React()

    useEffect(() => {
        if (!account) {
            return
        }

        getTokens(account).then((tokens) => {
            setTokens(tokens)
            setLoading(false)
        })
    }, [account])
    return (
        <>
            <TokensSlider title={t('collections')}>
                {tokens.map((token: any) => (
                    <TokenCard
                        key={token._id}
                        token={token}
                        renderContent={RenderCardContent}
                    />
                ))}
            </TokensSlider>
            {isLoading && <Loader />}
        </>
    )
}
