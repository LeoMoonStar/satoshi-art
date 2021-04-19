import React from 'react'
import cx from 'clsx'

import Avatar from 'shared/Avatar'
import artistImage from 'shared/images/artist/avatar.jpg'
import useStyles from './Notifications.style'

export default function Notifications(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <ul>
                <li>
                    <Avatar status="premium" image={artistImage} size={36} />
                    <div className={classes.info}>
                        <div className={classes.title}>
                            <b>Fimbim</b> accepted your bid
                        </div>
                        <div className={cx(classes.time, classes.justNowTime)}>
                            just know
                        </div>
                    </div>
                </li>{' '}
                <li>
                    <Avatar status="premium" image={artistImage} size={36} />
                    <div className={classes.info}>
                        <div className={classes.title}>
                            <b>Fimbim</b> accepted your bid
                        </div>
                        <div className={classes.time}>two hours ago</div>
                    </div>
                </li>
                <li>
                    <Avatar image={artistImage} size={36} />
                    <div className={classes.info}>
                        <div className={classes.title}>
                            <b>Fimbim</b> accepted your bid
                        </div>
                        <div className={classes.time}>two hours ago</div>
                    </div>
                </li>
                <li>
                    <Avatar status="premium" image={artistImage} size={36} />
                    <div className={classes.info}>
                        <div className={classes.title}>
                            <b>Fimbim</b> accepted your bid
                        </div>
                        <div className={classes.time}>two hours ago</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
