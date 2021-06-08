import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { getUserInfo } from 'apis/users'

import Avatar from 'components/avatar'
import useStyles from './History.style'
import { shortAddress } from 'utils/helpers'

const month: any = {
    "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": 
    "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"
}

export const History = ({ list, name }: any): JSX.Element => {
    const classes = useStyles()
    const displayTime = (createdate: number) => {
        const date = new Date(createdate);

        const dstr = JSON.stringify(date).split("T")
        const thedate = dstr[0].split("-")

        return month[thedate[1]] + " " + thedate[2]
    }

    const creator = list.length > 0 ? list[list.length - 1] : null
    const firsthistory = list.length > 1 ? list[list.length - 2] : null

    return (
        <div className={classes.container}>
            <div>
                {list.length > 0 ? 
                    list.map((info: any, index: number) => (
                        <>
                            {info.buyerUserId && (
                                <div className={classes.collectionContainer}>
                                    <Avatar size={48} alt="Profile photo" image={info.buyerAvatarUrl}/>
                                    <div className={classes.artistInfo}>
                                        <Typography variant="h3">{info.buyerUserName}</Typography>
                                        <div>bought for ${info.price} on {displayTime(parseInt(info.createDate))}</div>
                                    </div>
                                </div>
                            )}

                            {info.sellerUserId ?
                                index < list.length - 2 ? 
                                    <div className={classes.collectionContainer}>
                                        <Avatar size={48} alt="Profile photo" image={info.sellerAvatarUrl}/>
                                        <div className={classes.artistInfo}>
                                            <Typography variant="h3">{info.sellerUserName}</Typography>
                                            <div>sold for ${info.price} on {displayTime(parseInt(info.createDate))}</div>
                                        </div>
                                    </div>
                                    :
                                    null
                            : null }
                        </>
                    ))
                    :
                    <div>No history yet</div>
                }

                {creator || firsthistory ? 
                    <div className={classes.collectionContainer} style={{ marginTop: 50 }}>
                        <div className={classes.artistInfo}>
                            <div>
                                <strong>{name} </strong> 

                                was created on the ethereum blockchain 
                                
                                {firsthistory ? 
                                    firsthistory.buyerUserId ?
                                        ' and bought by ' + firsthistory.buyerUserName + ' '
                                        :
                                        ' and sold by ' + firsthistory.sellerUserName + ' '
                                : ' ' }

                                on {displayTime(parseInt(creator.createDate))}
                            </div>
                        </div>
                    </div>
                : null }
            </div>
        </div>
    )
}
