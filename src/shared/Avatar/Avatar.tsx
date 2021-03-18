import React from 'react'
import artistStatus from 'shared/images/artist/artistStatus.png'
import useStyles from './Avatar.style'

type AvatarProps = {
    size?: number
    image: string
    alt: string
    status?: string | null
}

export default function Avatar({
    size = 60,
    image,
    alt,
    status = null,
}: AvatarProps): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container} style={{ fontSize: size }}>
            {status && (
                <img
                    className={classes.status}
                    src={artistStatus}
                    alt={status}
                />
            )}
            <img className={classes.image} src={image} alt={alt} />
        </div>
    )
}
