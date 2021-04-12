import React from 'react'
import clsx from 'clsx'
import { LogoIcon } from 'shared/icons'
// import artistStatus from 'shared/images/artist/artistStatus.png'
import useStyles from './Avatar.style'

type AvatarProps = {
    size?: number
    image: string
    alt?: string
    status?: string | null
    onClick?: () => void
    className?: string
}

export default function Avatar({
    size = 60,
    // image,
    // alt = '',
    className = '',
    onClick,
    status = null,
}: AvatarProps): JSX.Element {
    const classes = useStyles()

    return (
        <>
            <div
                role={onClick ? 'button' : 'presentation'}
                className={clsx(classes.container, className, {
                    [classes.pointer]: onClick,
                })}
                style={{ fontSize: size }}
                onClick={onClick}
            >
                {status && (
                    <LogoIcon className={classes.image} />
                    // <img
                    //     className={classes.status}
                    //     src={artistStatus}
                    //     alt={status}
                    // />
                )}
                <LogoIcon className={classes.image} />
                {/*<img className={classes.image} src={image} alt={alt} />*/}
            </div>
        </>
    )
}
