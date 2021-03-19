import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Avatar from 'shared/Avatar'
import useStyles from './TokenInfo.style'

export const TokenInfo = (): JSX.Element => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <div>
                <Link to="/artists/1" className={classes.ownerContainer}>
                    <div className={classes.imageWrapper}>
                        <Avatar
                            size={48}
                            alt="Profile photo"
                            status="premium"
                            image="https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240"
                        />
                    </div>
                    <div className={classes.artistInfo}>
                        <Typography
                            variant="subtitle1"
                            className={classes.artistRole}
                        >
                            {t('owner')}
                        </Typography>
                        <Typography variant="h3">Fimbim</Typography>
                    </div>
                </Link>
                <Link to="/artists/1" className={classes.creatorContainer}>
                    <div className={classes.imageWrapper}>
                        <Avatar
                            size={48}
                            alt="Profile photo"
                            status="premium"
                            image="https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240"
                        />
                    </div>
                    <div className={classes.artistInfo}>
                        <Typography
                            variant="subtitle1"
                            className={classes.artistRole}
                        >
                            {t('creator')}
                        </Typography>
                        <Typography variant="h3">Fimbim</Typography>
                    </div>
                </Link>
            </div>
            <div className={classes.divider} />
            <Link to="/artists/1" className={classes.collectionContainer}>
                <Avatar
                    size={48}
                    alt="Profile photo"
                    image="https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240"
                />
                <div className={classes.artistInfo}>
                    <Typography
                        variant="subtitle1"
                        className={classes.artistRole}
                    >
                        Collection(ERC721)
                    </Typography>
                    <Typography variant="h3">Fimbim</Typography>
                </div>
            </Link>
        </div>
    )
}
