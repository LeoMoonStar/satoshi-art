import React from 'react'

import Avatar from 'shared/Avatar'
import Button from 'shared/Button'
import { LikeIcon, ViewsIcon } from 'shared/icons'

import useStyles from './FollowingAndFollowers.style'

import preview from 'shared/images/artist/work.jpg'
const items: number[] = Array.from(
    { length: 5 },
    (index: number): number => index
)

const Item = () => {
    const classes = useStyles()

    return (
        <div className={classes.item}>
            <Avatar image={preview} size={84} />
            <div className={classes.itemInfo}>
                <div className={classes.topRow}>
                    <b className={classes.userName}>Flimbim</b>
                    <Button
                        variantCustom="outlinedLink"
                        className={classes.followingButton}
                    >
                        Following
                    </Button>
                </div>
                <div className={classes.location}>Berlin, Germany</div>
                <div className={classes.balance}>124.563 ETH</div>
                <div className={classes.bottomRow}>
                    <div className={classes.bottomCol}>
                        <LikeIcon /> 21,0k
                    </div>
                    <div className={classes.bottomCol}>
                        <ViewsIcon /> 216,8k
                    </div>
                </div>
            </div>
            <div className={classes.previewWorks}>
                <div className={classes.previewWork}>
                    <img src={preview} alt="" />
                </div>
                <div className={classes.previewWork}>
                    <img src={preview} alt="" />
                </div>
            </div>
        </div>
    )
}

export default function Collections(): JSX.Element {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.col}>
                <h2 className={classes.title}>Following</h2>
                <div className={classes.items}>
                    {items.map((item) => (
                        <Item key={item} />
                    ))}
                    <Button variantCustom="action" className={classes.viewAll}>
                        View All
                    </Button>
                </div>
            </div>
            <div className={classes.col}>
                <h2 className={classes.title}>Followers</h2>
                <div className={classes.items}>
                    {items.map((item) => (
                        <Item key={item} />
                    ))}
                    <Button variantCustom="action" className={classes.viewAll}>
                        View All
                    </Button>
                </div>
            </div>
        </div>
    )
}
