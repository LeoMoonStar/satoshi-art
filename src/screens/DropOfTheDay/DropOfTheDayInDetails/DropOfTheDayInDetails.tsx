import React from 'react'
// import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import detail1 from 'shared/images/dropOfTheDay/detail1.svg'
import detail2 from 'shared/images/dropOfTheDay/detail2.svg'
import detail3 from 'shared/images/dropOfTheDay/detail3.svg'

import useStyles from './DropOfTheDayInDetails.style'

export default function DropOfTheDayInDetails(): JSX.Element {
    const classes = useStyles()
    // const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <div className={classes.row}>
                <div className={classes.iconWrap}>
                    <img src={detail1} alt="" />
                </div>
                <div className={classes.info}>
                    <h2 className={classes.title}>Auction Details</h2>
                    <div className={classes.content}>
                        <p>
                            Bid to win Limited Edition Brad Pitt NFTs
                            celebrating Pitt’s greatest cinema moments!
                        </p>
                        <p>
                            The auction is now open and will run for 48hrs
                            ending on Saturday (4/2/21) at Ipm ET
                        </p>
                        <p>
                            All editions will be sold to the highest bidder,
                            English auction style`
                        </p>
                        <p>
                            • Users may place bids across multiple products and
                            editions as soon as the auction begins
                        </p>
                        <p>
                            • At the end of the auction, each of the 349 highest
                            qualifying bids across all editions will, following
                            receipt of payment, promptly receive their
                            commemorative NFT`s in their crypto wallet! All
                            auctions are subject to the auction terms and
                            conditions, a link to which can be found below.
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.row}>
                <div className={classes.iconWrap}>
                    <img src={detail2} alt="" />
                </div>
                <div className={classes.info}>
                    <h2 className={classes.title}>How to Buy</h2>
                    <div className={classes.content}>
                        <p>
                            The Brad Pitt’s NFT Collection is being offered
                            exclusively on Satoshi.ART with a public auction
                            that is now open and will end on Saturday, April 2nd
                            at 7pm ET.
                        </p>
                        <p>
                            Any bids made in the Last 10 minutes of the auction
                            will extend each edition auction by 10 additional
                            minutes.
                        </p>
                        <p>
                            You will need to setup a MetaMask Wallet to
                            participate in the auction. In order to bid you must
                            pay using Ethereum, the auction will not accept
                            credit cards.
                        </p>
                        <br />
                        <p>
                            <span>
                                To learn more about purchasing NFTs on
                                Satoshi.ART please click <Link to="">HERE</Link>
                                . Video instructions detailing how to setup your
                                MetaMask Wallet are available{' '}
                                <Link to="">HERE</Link>. For full auction terms
                                and conditions, please click{' '}
                                <Link to="">HERE</Link>.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.row}>
                <div className={classes.iconWrap}>
                    <img src={detail3} alt="" />
                </div>
                <div className={classes.info}>
                    <h2 className={classes.title}>Authentic Verification</h2>
                    <div className={classes.content}>
                        <p>
                            Each Limited Edition NFT card is marked with a
                            unique serial number with guaranteed scarcity and
                            protected ownership guaranteed by the blockchain. On
                            each card you will find the card`s edition number.
                        </p>
                        <p>
                            For instance - When you own the Pittfull#1 NFT, you
                            are the only person in the world with this digital
                            collectible!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
