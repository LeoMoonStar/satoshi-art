import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'clsx'

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'relative',
            width: '100%',
            height: 1,
            paddingBottom: '78%',
            overflow: 'hidden',
            '& img': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            },
        },
    }
})

interface TokenPreviewProps {
    src: string
    alt?: string
    className?: string
    style?: Record<string, number | string>
}

export default function TokenPreview({
    src,
    alt = '',
    className = '',
    style = {},
}: TokenPreviewProps): JSX.Element {
    const classes = useStyles()

    return (
        <div style={style} className={cx(classes.container, className)}>
            <img src={src} alt={alt} />
        </div>
    )
}
