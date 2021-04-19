import React from 'react'
// import { IconButton } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'

// import Button from 'shared/Button'
// import { SaveIcon, ViewsIcon } from 'shared/icons'
// import Avatar from 'shared/Avatar'
import Loader from 'shared/Loader'
import { Link } from 'react-router-dom'
// import TextGradient from 'shared/TexGradient'
// import preview from 'shared/images/artist/work.jpg'
// import artistAvatar from 'shared/images/artist/avatar.jpg'

import { Token } from 'api/tokens'
import useStyles from './Works.style'

type WorksListProps = {
    borderWidth?: number
    variant?: 'none' | 'rounded'
    isLoading?: boolean
    tokens?: Token[]
}

export default function WorksList({
    borderWidth = 1,
    variant = 'none',
    isLoading = true,
    tokens = [],
}: WorksListProps): JSX.Element {
    const classes = useStyles()
    // const { t } = useTranslation()

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <div className={classes.grid}>
                {tokens.map(
                    ({ metadata: { payload, type, thumbnail }, id }) => {
                        return (
                            <div className={classes.work} key={id}>
                                <div className={classes.imagePresentation}>
                                    <Link to={`product/${id}`}>
                                        <img
                                            src={
                                                thumbnail ??
                                                payload.cover ??
                                                payload.file
                                            }
                                            style={{
                                                borderRadius:
                                                    variant === 'rounded'
                                                        ? 30
                                                        : 0,
                                            }}
                                            className={classes.preview}
                                            alt={payload.description}
                                        />
                                    </Link>
                                </div>
                                <div
                                    className={classes.info}
                                    style={{ borderWidth }}
                                >
                                    {/*<div className={classes.authorAvatar}>*/}
                                    {/*    <Avatar*/}
                                    {/*        size={60}*/}
                                    {/*        image={artistAvatar}*/}
                                    {/*        alt="User name"*/}
                                    {/*        status="premium"*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <div className={classes.infoHead}>
                                        <h2 className={classes.name}>
                                            {payload.name}
                                        </h2>
                                        {/*<div className={classes.actionButtons}>*/}
                                        {/*    <IconButton*/}
                                        {/*        className={classes.actionButton}*/}
                                        {/*    >*/}
                                        {/*        <SaveIcon />*/}
                                        {/*    </IconButton>*/}
                                        {/*    <IconButton*/}
                                        {/*        className={classes.actionButton}*/}
                                        {/*    >*/}
                                        {/*        <ViewsIcon />*/}
                                        {/*    </IconButton>*/}
                                        {/*</div>*/}
                                    </div>
                                    {/*<div className={classes.authorInfo}>*/}
                                    {/*    <a href="">@Fimbim</a> 124.56x3 ETH*/}
                                    {/*</div>*/}
                                    <div className={classes.workInfo}>
                                        {/*0.25 ETH*/}
                                        <span className={classes.count}>
                                            {type === 'multiple'
                                                ? `${payload.copiesCount} of ${payload.copiesCount}`
                                                : '1 of 1'}
                                        </span>
                                        {/*<Button className={classes.bidButton}>*/}
                                        {/*    <TextGradient colors="#FF0099, #6A2FE7">*/}
                                        {/*        {t('placeABid')}*/}
                                        {/*    </TextGradient>*/}
                                        {/*</Button>*/}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
            {/*<Button*/}
            {/*    variantCustom="action"*/}
            {/*    onClick={onShowMore}*/}
            {/*    className={classes.showMoreButton}*/}
            {/*>*/}
            {/*    Show more*/}
            {/*</Button>*/}
        </div>
    )
}
