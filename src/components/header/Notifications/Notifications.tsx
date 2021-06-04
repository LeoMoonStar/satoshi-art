import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cx from 'clsx'
import { getNotifications, getUserInfo } from 'apis/users'

import Avatar from 'components/avatar'
import artistImage from 'components/images/artist/avatar.jpg'
import useStyles from './Notifications.style'

export default function Notifications(): JSX.Element {
    const classes = useStyles()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        getNotifications()
            .then(({ data }) => {
                const datas = data

                datas.forEach(async function (data: any) {
                    const userInfo = await getUserInfo(data.userId)

                    data['name'] = userInfo.data.name
                    data['avatarUrl'] = userInfo.data.avatarUrl
                })

                setNotifications(datas)
            })
    })
    
    return (
        <div className={classes.container}>
            <ul>
                {notifications.length > 0 ? 
                    notifications.map((item: any, index) => (
                        <li key={index}>
                            <Avatar status="premium" image={item.avatarUrl} size={36} />
                            <div className={classes.info}>
                                <div className={classes.title}>
                                    <Link to={`/artists/${item.userId}`} style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>{item.name}</Link> 
                                    {item.action}
                                </div>
                                <div className={cx(classes.time, classes.justNowTime)}>{item.createDate}</div>
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
