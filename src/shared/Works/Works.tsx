import React from 'react'
import { IconButton, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { SaveIcon, ViewsIcon } from 'shared/icons'
import Avatar from 'shared/Avatar'
import Loader from 'shared/Loader'
import preview from 'shared/images/artist/work.jpg'
import artistAvatar from 'shared/images/artist/avatar.jpg'

import useStyles from './Works.style'

const works = Array.from({ length: 12 }, (_, index) => index)

function ProductsList(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div>
            <div className={classes.grid}>
                {works.map((work) => (
                    <div className={classes.work} key={work}>
                        <img src={preview} className={classes.preview} alt="" />
                        <div className={classes.info}>
                            <div className={classes.authorAvatar}>
                                <Avatar
                                    size={60}
                                    image={artistAvatar}
                                    alt="User name"
                                    status="premium"
                                />
                            </div>
                            <div className={classes.infoHead}>
                                <h2 className={classes.name}>Fresh Meat #F</h2>
                                <div className={classes.actionButtons}>
                                    <IconButton
                                        title={t('Like')}
                                        className={classes.actionButton}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton
                                        title={t('View')}
                                        className={classes.actionButton}
                                    >
                                        <ViewsIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className={classes.authorInfo}>
                                <a href="">@Fimbim</a> 124.56x3 ETH
                            </div>
                            <div className={classes.workInfo}>
                                0.25 ETH
                                <span className={classes.count}>1 of 1</span>
                                <Button className={classes.bidButton}>
                                    {t('placeABid')}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Loader />
        </div>
    )
}

export default ProductsList
