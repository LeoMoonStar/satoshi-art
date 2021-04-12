import React from 'react'

import Avatar from 'shared/Avatar'
import Button from 'shared/Button'

import useStyles from './FollowingAndFollowers.style'

import preview from 'shared/images/artist/work.jpg'
const mockTokens = Array.from({ length: 24 }, (index) => ({
    id: index,
    preview,
    name: 'Fresh Meat #F',
    author: {
        image: '',
        name: 'Fimbim',
        price: '124.56x3 ETH',
    },
}))

const Item = () => {
    const classes = useStyles()

    return (
        <div className={classes.item}>
            <Avatar image={preview} size={84} />
            <div className={classes.itemInfo}>
                <div className={classes.topRow}>
                    <b>Flimbim</b>
                    <Button variantCustom="outlined">Following</Button>
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
                <Item />
            </div>
            <div className={classes.col}>
                <h2 className={classes.title}>Followers</h2>
            </div>
        </div>
    )
}
