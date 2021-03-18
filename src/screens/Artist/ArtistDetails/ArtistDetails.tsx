import React, { useState } from 'react'
import { IconButton, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Avatar from 'shared/Avatar'
import { LikeIcon, SaveIcon, ViewsIcon, ThreeDotsIcon } from 'shared/icons'
import artistAvatar from 'shared/images/artist/avatar.jpg'
import nftImage from 'shared/images/nft.svg'

import useStyles from './ArtistDetails.style'

export default function ArtistDetails(): JSX.Element {
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
                        <Button className={classes.followButton}>
                            {t('Follow')}
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
                <div className={classes.container}>
                    <div>
                        <div className={classes.artistInfoWrapper}>
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
                            <div>Artist</div>
                            <div className={classes.name}>Fimbim</div>
                            <div className={classes.code}>
                                0x83fa662610b20...7495
                            </div>
                            <div className={classes.helpText}>
                                Relax Pepe collections. Stay tuned for new NFTs
                            </div>
                            <a href="" className={classes.linkToWebPage}>
                                fimbim.com.br
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
