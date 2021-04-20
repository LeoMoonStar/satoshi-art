import React, { useState, useRef } from 'react'
import { IconButton } from '@material-ui/core'
import { Popover } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { ShowMoreIcon } from 'shared/icons'
import {
    EditIcon,
    RemoveIcon,
    TransferIcon,
    BurnIcon,
} from 'shared/icons/dashboard'
import useStyles from './Tokens.style'
import TokensSlider from './TokensSlider'
import TokenCard from './TokenCard'
import { getTokens, Token } from 'api/tokens'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { TokenType } from 'state/transactions/actions'

const RenderCardContent = ({ token }: { token: Token }) => {
    const classes = useStyles()
    const [isOpen, setOpen] = useState<boolean>(false)
    const anchorElRef = useRef()
    const { t } = useTranslation()
    const { payload, type } = token?.metadata

    return (
        <>
            <div className={classes.head}>
                <h3 className={classes.tokenName}>{payload.name}</h3>
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
                                    <EditIcon />
                                </div>
                                {t('changePrice')}
                            </button>
                            <button type="button">
                                <div>
                                    <RemoveIcon />
                                </div>
                                {t('removeFromSale')}
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
            {type === TokenType.MULTIPLE && (
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

export default function OnSale(): JSX.Element | null {
    const { t } = useTranslation()
    const [tokens, setTokens] = useState<Token[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const { account } = useWeb3React()
    useEffect(() => {
        if (!account) {
            return
        }

        getTokens({ walletHash: account, status: 'onSale' }).then((tokens) => {
            setTokens(tokens)
            setLoading(false)
        })
    }, [account])

    if (tokens.length === 0) {
        return null
    }

    return (
        <TokensSlider
            isLoading={isLoading}
            count={tokens.length}
            title={t('onSale')}
        >
            {tokens.map((token: Token) => (
                <TokenCard
                    key={token.id}
                    token={token}
                    renderContent={RenderCardContent}
                />
            ))}
        </TokensSlider>
    )
}
