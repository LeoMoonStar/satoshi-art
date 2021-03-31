import React from 'react'
import artistStatus from 'shared/images/artist/artistStatus.png'
import useStyles from './Avatar.style'

type AvatarProps = {
    size?: number
    image: string
    alt?: string
    status?: string | null
    onClick?: () => void
}

export default function Avatar({
    size = 60,
    image,
    alt = '',
    onClick,
    status = null,
}: AvatarProps): JSX.Element {
    const classes = useStyles()

    return (
        <>
            <div
                role={onClick ? 'button' : 'presentation'}
                className={classes.container}
                style={{ fontSize: size }}
                onClick={onClick}
            >
                {status && (
                    <img
                        className={classes.status}
                        src={artistStatus}
                        alt={status}
                    />
                )}
                <img className={classes.image} src={image} alt={alt} />
            </div>
        </>
    )
}
