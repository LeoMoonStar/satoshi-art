import React, { useState } from 'react'
import {
    styled,
    Grid,
    Typography,
    IconButton,
    Tab,
    Tabs,
    Theme,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { ReactComponent as SaveIcon } from 'shared/icons/save.svg'
import { ReactComponent as ExpandIcon } from 'shared/icons/expand.svg'
import { ReactComponent as DotsIcon } from 'shared/icons/dots.svg'
import { ReactComponent as LikeIcon } from 'shared/icons/like.svg'
import { ReactComponent as ViewsIcon } from 'shared/icons/views.svg'
import { ReactComponent as GreySaveIcon } from 'shared/icons/greySave.svg'
import Button from 'shared/Button'
import { TokenInfo } from './TokenInfo'
import useStyles from './TokenDetails.style'

const IconWrapper = styled(Grid)(
    ({ dots, theme }: { dots?: boolean; theme: Theme }) => ({
        width: dots ? 82 : 40,
        height: 40,
        marginRight: dots ? 0 : 13,
        backgroundColor: `${theme.custom.common.blackColor}80`,
        borderRadius: 20,
        display: 'flex',
    })
)

const InfoIconWrapper = styled(Grid)(
    ({ lastIcon }: { lastIcon?: boolean }) => ({
        display: 'flex',
        marginRight: lastIcon ? 0 : 30,
    })
)

enum TabVariants {
    INFO = 0,
    OWNERS = 1,
    HISTORY = 2,
    BIDS = 3,
}

const tabs = [
    {
        label: 'Info',
        value: TabVariants.INFO,
    },
    {
        label: 'Owners',
        value: TabVariants.OWNERS,
    },
    {
        label: 'History',
        value: TabVariants.HISTORY,
    },
    {
        label: 'Bids',
        value: TabVariants.BIDS,
    },
]

const TokenDetails = (): JSX.Element => {
    const [tab, selectTab] = useState(TabVariants.INFO)

    const classes = useStyles()
    const { t } = useTranslation()

    const handleTab = (_: React.ChangeEvent<unknown>, newValue: number) => {
        selectTab(newValue)
    }
    return (
        <div className={classes.container}>
            <div>
                <div className={classes.imageWrapper}>
                    <img
                        className={classes.tokenImage}
                        src={
                            'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg'
                        }
                        alt={'Token image'}
                    />
                    <div className={classes.iconsContainer}>
                        <IconWrapper item alignItems="center" justify="center">
                            <IconButton>
                                <SaveIcon />
                            </IconButton>
                        </IconWrapper>
                        <IconWrapper item alignItems="center" justify="center">
                            <IconButton>
                                <ExpandIcon />
                            </IconButton>
                        </IconWrapper>
                        <IconWrapper
                            item
                            alignItems="center"
                            justify="center"
                            dots={true}
                        >
                            <IconButton>
                                <DotsIcon />
                            </IconButton>
                        </IconWrapper>
                    </div>
                </div>
                <div className={classes.socialActivityContainer}>
                    <InfoIconWrapper item direction="row" alignItems="center">
                        <GreySaveIcon />{' '}
                        <Typography
                            variant="h6"
                            className={classes.socialActivityAmount}
                        >
                            2k
                        </Typography>
                    </InfoIconWrapper>
                    <InfoIconWrapper item direction="row" alignItems="center">
                        <ViewsIcon />{' '}
                        <Typography
                            variant="h6"
                            className={classes.socialActivityAmount}
                        >
                            3.5k
                        </Typography>
                    </InfoIconWrapper>
                    <InfoIconWrapper
                        item
                        direction="row"
                        alignItems="center"
                        lastIcon={true}
                    >
                        <LikeIcon />{' '}
                        <Typography
                            variant="h6"
                            className={classes.socialActivityAmount}
                        >
                            220
                        </Typography>
                    </InfoIconWrapper>
                </div>
            </div>
            <div className={classes.tokenDetailsContainer}>
                <div>
                    <Typography variant="h6" className={classes.artLabel}>
                        ART
                    </Typography>
                    <Typography variant="h1">Dream Candy</Typography>
                    <div className={classes.tokenPriceContainer}>
                        <Typography variant="h2">1.00 ETH</Typography>
                        <Typography
                            variant="h6"
                            className={classes.tokenDollarPrice}
                        >
                            $1846 1 of 1
                        </Typography>
                    </div>
                    <div className={classes.descriptionContainer}>
                        <Typography variant="h4">
                            {t('thereIsNoDscr')}
                        </Typography>
                    </div>
                </div>
                {/* @TODO: change label color for not active tabs*/}
                <Tabs
                    value={tab}
                    onChange={handleTab}
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                >
                    {tabs.map(({ label, value }) => (
                        <Tab
                            key={`${label}_${Math.random()}`}
                            classes={{
                                root: classes.styledTab,
                                selected: classes.selectedTab,
                            }}
                            disableRipple
                            selected={tab === value}
                            value={value}
                            label={t(label)}
                        />
                    ))}
                </Tabs>
                {tab === TabVariants.INFO && <TokenInfo />}
                {tab === TabVariants.OWNERS && <div />}
                {tab === TabVariants.HISTORY && <div />}
                {tab === TabVariants.BIDS && <div />}
                <Grid>
                    <div className={classes.highestBidInfoContainer}>
                        <div className={classes.highestBidContainer}>
                            <Typography variant="h6">
                                {t('highestBidBy')}
                            </Typography>
                            <Typography
                                variant="h6"
                                className={classes.walletAddress}
                            >
                                0xcabb22cb1...ba05
                            </Typography>
                        </div>
                        <div className={classes.highestBidContainer}>
                            <Typography variant="h2">2,000 DAI</Typography>
                            <Typography
                                variant="h3"
                                className={classes.bidDollarAmount}
                            >
                                $2,000
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button
                            label={t('buyNow')}
                            className={classes.buyButton}
                        />
                        <Button
                            label={t('placeABid')}
                            className={classes.placeBidButton}
                        />
                    </div>
                    <div className={classes.serviceFeeInfoContainer}>
                        <Typography variant="h6">
                            {t('serviceFee')} 2.5%.
                        </Typography>
                        <Typography
                            variant="h6"
                            className={classes.serviceCryptoFee}
                        >
                            10.486 ETH
                        </Typography>
                        <Typography
                            variant="h6"
                            className={classes.serviceDollarFee}
                        >
                            $19,333.52
                        </Typography>
                    </div>
                </Grid>
            </div>
        </div>
    )
}

export default TokenDetails
