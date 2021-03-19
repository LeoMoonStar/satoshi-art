import React from 'react'
import useStyles from './FollowersGallery.style'

const images = [
    {
        id: 1,
        src:
            'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg',
    },
    {
        id: 2,
        src:
            'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg',
    },
    {
        id: 3,
        src:
            'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg',
    },
    {
        id: 4,
        src:
            'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg',
    },
    {
        id: 5,
        src:
            'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg',
    },
]

const FollowersGallery = (): JSX.Element => {
    const classes = useStyles()
    if (!images.length) {
        return (
            <div className={classes.noData}>
                This user has not uploaded any items yet
            </div>
        )
    }
    return (
        <div className={classes.imgRow}>
            {images.map((img) => (
                <img
                    key={img.id}
                    alt=""
                    className={classes.img}
                    src={img.src}
                />
            ))}
        </div>
    )
}

export default FollowersGallery
