import React, { useState, useRef, useEffect, useMemo } from 'react'
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
import PutOnSaleModal from './TokenActions/PutOnSaleModal'
import PutOnSaleProgressModal from './TokenActions/PutOnSaleProgressModal'
import { TokenType } from 'state/transactions/actions'

const RenderCardContent = ({
    token,
    onPutOnSale,
}: {
    token: Token
    onPutOnSale: (toke: Token) => Token
}) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const { payload, type } = token?.metadata
    const anchorElRef = useRef()
    const [isOpen, setOpen] = useState<boolean>(false)

    return (
        <>
            <div className={classes.head}>
                <h3 className={classes.tokenName}>{payload?.name}</h3>
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
                            <button
                                type="button"
                                onClick={() => onPutOnSale(token)}
                            >
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
            {type === TokenType.MULTIPLE && (
                <div className={classes.count}>
                    {payload?.copiesCount} of {payload?.copiesCount}
                </div>
            )}
            {/*@TODO: show price only when user set price for the token, need to do when backend will be ready*/}
            <div className={classes.createdInfo}>
                <a href="">@Coll3ctor</a> 1,995 ETH
            </div>
        </>
    )
}

export default function Created(): JSX.Element {
    const [tokens, setTokens] = useState<Token[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const { account } = useWeb3React()
    const [selectedToken, setSelectedToken] = useState<Token | null>(null)
    const [isPutOnSale, setPutOnSale] = useState<boolean>(false)
    const { t } = useTranslation()

    useEffect(() => {
        if (!account) {
            return
        }

        getTokens({ walletHash: account }).then((tokens) => {
            setTokens(tokens)
            setLoading(false)
        })
    }, [account])

    const renderContent = useMemo(() => {
        const handlePutOnSale = (token: any) => {
            setPutOnSale(true)
            setSelectedToken(token)
        }
        return function RenderCardContentWithHandlers(props: any) {
            return (
                <RenderCardContent {...props} onPutOnSale={handlePutOnSale} />
            )
        }
    }, [setSelectedToken])

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
                        renderContent={renderContent}
                    />
                ))}
            </TokensSlider>
            {selectedToken !== null && isPutOnSale && (
                <PutOnSaleModal
                    token={selectedToken}
                    onClose={() => setPutOnSale(false)}
                />
            )}
        </>
    )
}
