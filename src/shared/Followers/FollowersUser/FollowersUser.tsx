import React, { useState } from 'react'
import Button from 'shared/Button'
import Avatar from 'shared/Avatar'
import { GreySaveIcon, ViewsIcon } from 'shared/icons'
import artistAvatar from 'shared/images/artist/avatar.jpg'
import useStyles from './FollowersUser.style'

const FollowersUser = ({ name }: { name: string }): JSX.Element => {
    const [isFollowing, setIsFollowing] = useState<boolean>()
    const classes = useStyles()

    const preventDefault = (event: React.SyntheticEvent) =>
        event.preventDefault()

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
                    <Button
                        className={classes.actionBtn}
                        onClick={() =>
                            setIsFollowing((isFollowing) => !isFollowing)
                        }
                    >
                        {isFollowing ? 'Following' : 'Follow'}{' '}
                    </Button>
                </div>
                <div className={classes.info}>
                    <div>Berlin, Germany</div>
                    <div>124,563 ETH</div>
                </div>
                <div className={classes.socialBtns}>
                    <a
                        href="#"
                        onClick={preventDefault}
                        className={classes.socialBtn}
                    >
                        <GreySaveIcon />
                        <span>21.0k</span>
                    </a>
                    <a
                        href="#"
                        onClick={preventDefault}
                        className={classes.socialBtn}
                    >
                        <ViewsIcon />
                        <span>216,8k</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FollowersUser