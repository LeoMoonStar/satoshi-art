import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Avatar from 'shared/Avatar'
import useStyles from './TokenInfo.style'
import { Token } from 'api/tokens'
import { shortAddress } from 'utils/helpers'

export const TokenInfo = ({ token }: { token: Token }): JSX.Element => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <div>
                {token?.metadata?.walletHash && (
                    <div className={classes.ownerContainer}>
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
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://ropsten.etherscan.io/address/${token?.metadata?.walletHash}`}
                            >
                                <Typography variant="h3">
                                    {shortAddress(token?.metadata?.walletHash)}
                                </Typography>
                            </a>
                        </div>
                    </div>
                )}
                {token?.metadata?.walletHash && (
                    <div className={classes.creatorContainer}>
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
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://ropsten.etherscan.io/address/${token?.metadata?.walletHash}`}
                            >
                                <Typography variant="h3">
                                    {shortAddress(token?.metadata?.walletHash)}
                                </Typography>
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <div className={classes.divider} />
            <div className={classes.collectionContainer}>
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
            </div>
        </div>
    )
}
