import React, { useState } from 'react'
import clsx from 'clsx'
import { IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Button from 'shared/Button'
import Avatar from 'shared/Avatar'
import { LikeIcon, SaveIcon, ViewsIcon, ThreeDotsIcon } from 'shared/icons'
import artistAvatar from 'shared/images/artist/avatar.jpg'
import nftImage from 'shared/images/nft.svg'

import useStyles from './PageDetails.style'

type ProfileType = {
    title: string
    name: string
    hash: string
    dscr: string
    url: string
}

interface PageDetailsProps {
    profile: ProfileType
    center?: boolean
}

export default function PageDetails({
    profile,
    center,
}: PageDetailsProps): JSX.Element {
    const classes = useStyles()
    const [isOpenActions, setIsOpenActions] = useState<boolean>()
    const { t } = useTranslation()

    const handleToggleActions = () => {
        setIsOpenActions(!isOpenActions)
    }
    return (
        <>
            <div className={classes.intro}>
                <div className={classes.container}>
                    <div className={classes.artistStatistic}>
                        <div className={classes.artistStatisticItem}>
                            <SaveIcon />
                            2k
                        </div>
                        <div className={classes.artistStatisticItem}>
                            <ViewsIcon />
                            3.5k
                        </div>
                        <div className={classes.artistStatisticItem}>
                            <LikeIcon />
                            220
                        </div>
                        <Button
                            variantCustom="action"
                            className={classes.followButton}
                        >
                            {t('follow')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className={classes.artistInfo}>
                <img
                    src={nftImage}
                    alt=""
                    className={classes.nftBackgroundImage}
                />
                <div
                    className={clsx(classes.container, {
                        [classes.center]: center,
                    })}
                >
                    <div>
                        <div
                            className={clsx(classes.artistInfoWrapper, {
                                [classes.centerAvatar]: center,
                            })}
                        >
                            <Avatar
                                size={140}
                                image={artistAvatar}
                                alt="Jack Jackson"
                                status="premium"
                            />
                            <div className={classes.actions}>
                                <IconButton
                                    className={classes.actionsButton}
                                    onClick={handleToggleActions}
                                >
                                    <ThreeDotsIcon />
                                </IconButton>
                                {isOpenActions && (
                                    <div className={classes.actionsList}>
                                        <Button>Add to favorite</Button>
                                        <Button>Send message</Button>
                                        <Button>Add to friends</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={classes.artistInfoList}>
                            <div>{profile.title}</div>
                            <div className={classes.name}>{profile.name}</div>
                            <div className={classes.code}>{profile.hash}</div>
                            <div className={classes.helpText}>
                                {profile.dscr}
                            </div>
                            <a href="" className={classes.linkToWebPage}>
                                {profile.url}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
