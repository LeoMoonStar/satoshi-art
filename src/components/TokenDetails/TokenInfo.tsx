import React from 'react'
import { Typography } from '@material-ui/core'
import { ReactComponent as OwnerIndicator } from 'shared/icons/ownerIndicator.svg'
import { ReactComponent as CreatorIndicator } from 'shared/icons/creatorIndicator.svg'
import useStyles from './TokenInfo.style'

export const TokenInfo = (): JSX.Element => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div>
                <div className={classes.ownerContainer}>
                    <div className={classes.imageWrapper}>
                        <img
                            className={classes.profilePhoto}
                            src={
                                'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240'
                            }
                            alt={'Profile photo'}
                        />
                        <div className={classes.iconContainer}>
                            <div className={classes.iconWrapper}>
                                <OwnerIndicator />
                            </div>
                        </div>
                    </div>
                    <div className={classes.artistInfo}>
                        <Typography
                            variant="subtitle1"
                            className={classes.artistRole}
                        >
                            Owner
                        </Typography>
                        <Typography variant="h3">Fimbim</Typography>
                    </div>
                </div>
                <div className={classes.creatorContainer}>
                    <div className={classes.imageWrapper}>
                        <img
                            className={classes.profilePhoto}
                            src={
                                'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240'
                            }
                            alt={'Profile photo'}
                        />
                        <div className={classes.iconContainer}>
                            <div className={classes.iconWrapper}>
                                <CreatorIndicator />
                            </div>
                        </div>
                    </div>
                    <div className={classes.artistInfo}>
                        <Typography
                            variant="subtitle1"
                            className={classes.artistRole}
                        >
                            Creator
                        </Typography>
                        <Typography variant="h3">Fimbim</Typography>
                    </div>
                </div>
            </div>
            <div className={classes.divider} />
            <div className={classes.collectionContainer}>
                <img
                    className={classes.profilePhoto}
                    src={
                        'https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmUYRjX7CNrUzPXJ287v5YZGDSKxztc6ddBkiWvG8BBsDe&w=240'
                    }
                    alt={'Profile photo'}
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
            </div>
        </div>
    )
}
