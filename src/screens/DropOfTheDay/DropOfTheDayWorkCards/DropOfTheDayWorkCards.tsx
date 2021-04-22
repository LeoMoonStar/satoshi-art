import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'shared/Button'
import card1 from 'shared/images/dropOfTheDay/card1.png'
import card2 from 'shared/images/dropOfTheDay/card2.png'
import card3 from 'shared/images/dropOfTheDay/card3.png'
import card4 from 'shared/images/dropOfTheDay/card4.png'
import useStyles from './DropOfTheDayWorkCards.style'
import useWalletTokens from './../../../hooks/useWalletTokens'

const items = [
    { id: 1, image: card1 },
    { id: 2, image: card2 },
    { id: 3, image: card3 },
    { id: '6080107c6aeffc0014c8df3d', image: card4 }, // hardcoded my Token.id
]

export default function OrderListFilters(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const walletTokens = useWalletTokens()
    const foundIdInFilteredTokens = (id: string | number): boolean => {
        return walletTokens.some((el: any) => el.id === id)
    }

    return (
        <section className={classes.container}>
            {items.map(({ id, image }) => (
                <div key={id} className={classes.card}>
                    <img src={image} alt="" />
                    <div className={classes.header}>
                        <h2 className={classes.title}>Pittful#1</h2>
                        <div className={classes.count}>
                            {t('countOfCount', { value1: 2, value2: 10 })}
                        </div>
                    </div>
                    <div className={classes.subTitle}>Brad’s Vault</div>
                    <ul className={classes.list}>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Etiam iaculis nulla eu sodales sagittis</li>
                        <li>
                            Felis pellentesque nibh, in varius ipsum orci et
                        </li>
                        <li>Aliquam posuere purus mi, vitae luctus justo</li>
                        <li>Nulla pulvinar sed nisl</li>
                    </ul>
                    {foundIdInFilteredTokens(id) ? (
                        <h1>You are the owner</h1>
                    ) : (
                        <Button
                            className={classes.buyNow}
                            fullWidth
                            variantCustom="action"
                        >
                            {t('buyNow')}
                        </Button>
                    )}
                </div>
            ))}
        </section>
    )
}
