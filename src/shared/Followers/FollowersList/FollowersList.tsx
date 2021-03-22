import React from 'react'
import Loader from 'shared/Loader'
import FollowersUser from '../FollowersUser'
import FollowersGallery from '../FollowersGallery'
import useStyles from './FollowersList.style'

type ImageType = {
    id: number
    src: string
}

type UserType = {
    id: number
    name: string
    images: Array<ImageType>
}

const FollowersList = ({ users }: { users: Array<UserType> }): JSX.Element => {
    const classes = useStyles()
    return (
        <>
            <div>
                {users.map((user) => (
                    <div key={user.id} className={classes.row}>
                        <FollowersUser name={user.name} />
                        <FollowersGallery images={user.images} />
                    </div>
                ))}
            </div>
            <Loader />
        </>
    )
}

export default FollowersList
