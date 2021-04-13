import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'

import { ViewsIcon, EditIcon, TrashIcon } from 'shared/icons'
import preview from 'shared/images/artist/work.jpg'
import useStyles from './Tokens.style'
import TokensSlider from './TokensSlider'
import TokenCard from './TokenCard'

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
    const { t } = useTranslation()

    return (
        <>
            <div className={classes.head}>
                <h3 className={classes.tokenName}>Fresh MEar #F</h3>
            </div>
            <div className={classes.userInfo}>
                <Link to="/">@Fimbim</Link>
                <span>124.56x3 ETH</span>
            </div>
            <div className={classes.controls}>
                <button
                    type="button"
                    className={cx(classes.controlButton, classes.viewButton)}
                >
                    <div>
                        <ViewsIcon />
                    </div>
                    <span>{t('viewBid')}</span>
                </button>
                <button
                    type="button"
                    className={cx(classes.controlButton, classes.editButton)}
                >
                    <div>
                        <EditIcon />
                    </div>
                    <span>{t('editBid')}</span>
                </button>
                <button
                    type="button"
                    className={cx(classes.controlButton, classes.cancelBid)}
                >
                    <div>
                        <TrashIcon />
                    </div>
                    <span>{t('cancelBid')}</span>
                </button>
            </div>
        </>
    )
}

export default function YourLatestBids(): JSX.Element {
    const { t } = useTranslation()

    return (
        <TokensSlider title={t('yourLatestBids')}>
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
