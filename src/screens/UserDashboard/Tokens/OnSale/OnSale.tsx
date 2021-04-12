import React, { useState, useRef } from 'react'
import { IconButton } from '@material-ui/core'
import { Popover } from '@material-ui/core'

import { ShowMoreIcon } from 'shared/icons'
import {
    EditIcon,
    RemoveIcon,
    TransferIcon,
    BurnIcon,
} from 'shared/icons/dashboard'
import preview from 'shared/images/artist/work.jpg'
import useStyles from './OnSale.style'
import TokensSlider from '../TokensSlider'
import TokenCard from '../TokenCard'

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

const RenderCardContent = () => {
    const classes = useStyles()
    const [isOpen, setOpen] = useState<boolean>(false)
    const anchorElRef = useRef()

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
                                    <EditIcon />
                                </div>
                                Change price
                            </button>
                            <button type="button">
                                <div>
                                    <RemoveIcon />
                                </div>
                                Remove from sale
                            </button>
                            <button type="button">
                                <div>
                                    <TransferIcon />
                                </div>
                                Transfer token
                            </button>
                            <button type="button">
                                <div>
                                    <BurnIcon />
                                </div>
                                Burn token
                            </button>
                        </div>
                    </Popover>
                </IconButton>
            </div>
            <div className={classes.count}>
                <span>0,44 ETH</span> 1 of 30
            </div>
            <div className={classes.highestBid}>
                Highest bid 1,995 ETH <br /> by <a href="">@Coll3ctor</a>
            </div>
        </>
    )
}

export default function OnSale(): JSX.Element {
    return (
        <TokensSlider title="On Sale">
            {mockTokens.map((token: any) => (
                <TokenCard
                    key={token.id}
                    token={token}
                    renderContent={RenderCardContent}
                />
            ))}
        </TokensSlider>
    )
}
