import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cx from 'clsx'
import { getNotifications, getUserInfo } from 'apis/users'

import Avatar from 'components/avatar'
import artistImage from 'components/images/artist/avatar.jpg'
import useStyles from './Notifications.style'

const month: any = {
    "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": 
    "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"
}

export default function Notifications(): JSX.Element {
    const classes = useStyles()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        getNotifications()
            .then(({ data }) => {
                data.forEach(async function (info: any) {
                    const userInfo: any = await getUserInfo(info.userId)

                    info['isArtist'] = userInfo.data.isArtist
                    info['name'] = userInfo.data.name
                    info['avatarUrl'] = userInfo.data.avatarUrl
                })

                setNotifications(data)
            })
    }, [])

    const displayTime = (createdate: number) => {
        const timelapse = Date.now() - createdate

        if (timelapse > 31540000000) { // > 1 year
            return (timelapse / 31540000000) + " year(s) ago"
        } else if (timelapse > 2628000000) { // > 1 month
            return (timelapse / 2628000000) + " month(s) ago" 
        } else if (timelapse > 604800000) { // > 1 week
            return (timelapse / 604800000) + " week(s) ago"
        } else if (timelapse > 86400000) { // > 1 day
            return (timelapse / 86400000) + " day(s) ago"
        } else if (timelapse > 3600000) { // > 1 hour
            return (timelapse / 3600000) + " hour(s) ago"
        } else if (timelapse > 60000) { // > 1 minute
            return (timelapse / 60000) + " minth(s) ago"
        } else if (timelapse > 1000) { // > 1 second
            return (timelapse / 1000) + " year(s) ago"
        }
    }
    
    return (
        <div className={classes.container}>
            <ul>
                {notifications.length > 0 ? 
                    notifications.map((item: any, index) => (
                        <li key={index}>
                            <Avatar status="premium" image={item.avatarUrl} size={36} />
                            <div className={classes.info}>
                                <div className={classes.title}>
                                    <Link to={item.isArtist ? `/artists/${item.userId}` : `/user/${item.userId}`} style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>{item.name}</Link> 
                                    {item.action}
                                </div>
                                <div className={cx(classes.time, classes.justNowTime)}>{displayTime(parseInt(item.createDate))}</div>
                            </div>
                        </li>
                    ))
                    :
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around', textAlign: 'center' }}>
                        <div style={{ marginLeft: 30, textAlign: 'center' }}>You have no notification(s)</div>
                    </div>
                    
                }
            </ul>
        </div>
    )
}
