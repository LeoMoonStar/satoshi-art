import React from 'react'
import Button from 'shared/Button'
import Avatar from 'shared/Avatar'
import { GreySaveIcon, ViewsIcon } from 'shared/icons'
import artistAvatar from 'shared/images/artist/avatar.jpg'
import useStyles from './FollowersUser.style'

const FollowersUser = ({ name }: { name: string }): JSX.Element => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Avatar
                size={100}
                image={artistAvatar}
                alt="User name"
                status="premium"
            />
            <div className={classes.bio}>
                <div className={classes.name}>
                    <div>{name}</div>
                    <Button className={classes.actionBtn}>Following</Button>
                </div>
                <div className={classes.info}>
                    <div>Berlin, Germany</div>
                    <div>124,563 ETH</div>
                </div>
                <div className={classes.socialBtns}>
                    <div className={classes.socialBtn}>
                        <GreySaveIcon />
                        <span>21.0k</span>
                    </div>
                    <div className={classes.socialBtn}>
                        <ViewsIcon />
                        <span>216,8k</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowersUser
