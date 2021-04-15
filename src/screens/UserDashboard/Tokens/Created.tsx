import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@material-ui/core'
import { Popover } from '@material-ui/core'

import { ShowMoreIcon } from 'shared/icons'
import { TransferIcon, BurnIcon, PriceIcon } from 'shared/icons/dashboard'
import useStyles from './Tokens.style'
import TokensSlider from './TokensSlider'
import TokenCard from './TokenCard'
import { getTokens, Token } from 'api/tokens'
import { useWeb3React } from '@web3-react/core'

const RenderCardContent = () => {
    const classes = useStyles()
    const [isOpen, setOpen] = useState<boolean>(false)
    const anchorElRef = useRef()
    const { t } = useTranslation()

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
                                    <PriceIcon />
                                </div>
                                {t('setAPrice')}
                            </button>
                            <button type="button">
                                <div>
                                    <TransferIcon />
                                </div>
                                {t('transferToken')}
                            </button>
                            <button type="button">
                                <div>
                                    <BurnIcon />
                                </div>
                                {t('burnToken')}
                            </button>
                        </div>
                    </Popover>
                </IconButton>
            </div>
            <div className={classes.count}>1 of 30</div>
            <div className={classes.createdInfo}>
                <a href="">@Coll3ctor</a> 1,995 ETH
            </div>
        </>
    )
}

export default function Created(): JSX.Element {
    const { t } = useTranslation()
    const [tokens, setTokens] = useState<Token[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const { account } = useWeb3React()

    useEffect(() => {
        if (!account) {
            return
        }

        getTokens({ walletHash: account }).then((tokens) => {
            setTokens(tokens)
            setLoading(false)
        })
    }, [account])

    return (
        <>
            <TokensSlider
                isLoading={isLoading}
                count={tokens.length}
                title={t('created')}
            >
                {tokens.map((token: any) => (
                    <TokenCard
                        key={token.id}
                        token={token}
                        renderContent={RenderCardContent}
                    />
                ))}
            </TokensSlider>
        </>
    )
}
