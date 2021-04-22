import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@material-ui/core'
import { Popover } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { ShowMoreIcon } from 'shared/icons'
import { TransferIcon, BurnIcon, PriceIcon } from 'shared/icons/dashboard'
import useStyles from './Tokens.style'
import TokensSlider from './TokensSlider'
import TokenCard from './TokenCard'
import { getTokens, Token, getToken2, Token2 } from 'api/tokens'
import { useWeb3React } from '@web3-react/core'
import PutOnSaleModal from './TokenActions/PutOnSaleModal'
import { TokenType } from 'state/transactions/actions'
import Price from 'shared/Price'

const RenderCardContent = ({
    token,
    onPutOnSale,
}: {
    token: Token2
    onPutOnSale: (token: Token) => Token
}) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const { payload, type } = token?.metadata
    const anchorElRef = useRef()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [tokenStatus, setTokenStatus] = useState<string | null>(null)

    useEffect(() => {
        const tryGetToken = () => {
            getToken2(token.id).then((res) => {
                setTokenStatus(res.status)
            })
        }
        tryGetToken()
    }, [token.id])

    return (
        <>
            <div className={classes.head}>
                <h3 className={classes.tokenName}>{payload?.name}</h3>
                <IconButton
                    className={classes.showMoreButton}
                    buttonRef={anchorElRef}
                    onClick={(e) => {
                        e.preventDefault()
                        setOpen(!isOpen)
                    }}
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
                            {tokenStatus !== null &&
                            tokenStatus === 'onSale' ? (
                                <span>Is already on Sale</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onPutOnSale(token)}
                                >
                                    <div>
                                        <PriceIcon />
                                    </div>
                                    {t('setAPrice')}
                                </button>
                            )}
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
            {tokenStatus !== null && tokenStatus === 'onSale' ? (
                <span>Is on Sale</span>
            ) : (
                <span>Could be saled</span>
            )}
            <div className={classes.createdInfo}>
                <Link to="/artists/1">@Coll3ctor</Link>{' '}
                {token.price && <Price.WeiToEth value={token.price} />}
            </div>
        </>
    )
}

export default function Created({
    setOutOfDatesSliders,
}: {
    setOutOfDatesSliders: (value: Record<any, boolean>) => void
}): JSX.Element {
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
        const handlePutOnSale = (token: Token) => {
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
                    onSuccess={() => setOutOfDatesSliders({ onSale: true })}
                    token={selectedToken}
                    onClose={() => setPutOnSale(false)}
                />
            )}
        </>
    )
}
