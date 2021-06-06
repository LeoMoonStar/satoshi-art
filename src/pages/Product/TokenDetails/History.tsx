import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { getUserInfo } from 'apis/users'

import Avatar from 'components/avatar'
import useStyles from './History.style'
import { shortAddress } from 'utils/helpers'

export const History = ({ list }: any): JSX.Element => {
    const classes = useStyles()
    const [history, setHistory] = useState([])

    return (
        <div className={classes.container}>
            <div>
                {list.length > 0 ? 
                    list.map((info: any) => (
                        <>
                            {info.buyerUserId && (
                                <div className={classes.collectionContainer}>
                                    <Avatar size={48} alt="Profile photo" image={info.buyerAvatarUrl}/>
                                    <div className={classes.artistInfo}>
                                        <Typography variant="subtitle1" className={classes.artistRole}>Buyer</Typography>
                                        <Typography variant="h3">{info.buyerUserName}</Typography>
                                    </div>
                                </div>
                            )}

                            {info.sellerUserId && (
                                <div className={classes.collectionContainer}>
                                    <Avatar size={48} alt="Profile photo" image={info.sellerAvatarUrl}/>
                                    <div className={classes.artistInfo}>
                                        <Typography variant="subtitle1" className={classes.artistRole}>Seller</Typography>
                                        <Typography variant="h3">{info.sellerUserName}</Typography>
                                    </div>
                                </div>
                            )}
                        </>
                    ))
                    :
                    <div>No history yet</div>
                }
            </div>
        </div>
    )
}
