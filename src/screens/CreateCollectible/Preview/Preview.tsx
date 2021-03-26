import React from 'react'
import Avatar from 'shared/Avatar'
import avatar from 'shared/images/artist/avatar.jpg'
import useStyles from './Preview.style'

type PreviewProps = {
    imgSrc: string | undefined
    fields: {
        name: string | undefined
        copiesCount?: number | undefined
        unlockContent?: string | undefined
        price?: number | undefined
    }
    isSingle: boolean
}

const Preview = ({ imgSrc, fields, isSingle }: PreviewProps): JSX.Element => {
    const classes = useStyles()
    const isFieldsNotEmpty = Object.values(fields).some(
        (field) => field !== undefined
    )
    return (
        <div className={classes.previewWrapper}>
            <div className={classes.lockableContent}>
                <div className={classes.subtitle}>Preview</div>
                <div className={classes.previewArea}>
                    {imgSrc || isFieldsNotEmpty ? (
                        <div className={classes.content}>
                            <div className={classes.references}>
                                <Avatar size={26} image={avatar} alt="John" />
                                <Avatar size={26} image={avatar} alt="John" />
                                <Avatar size={26} image={avatar} alt="John" />
                            </div>
                            <div className={classes.previewImgWrapper}>
                                {imgSrc && (
                                    <img src={imgSrc} alt="preview-image" />
                                )}
                            </div>
                            <div className={classes.previewDscr}>
                                <div>{fields.name}</div>
                                <div>
                                    {fields.price
                                        ? fields.price
                                        : 'Not for sale'}{' '}
                                    {isSingle ? (
                                        <span>1 of 1</span>
                                    ) : (
                                        <span>
                                            {fields.copiesCount
                                                ? `${fields.copiesCount} of ${fields.copiesCount}`
                                                : '0 in stock'}
                                        </span>
                                    )}
                                </div>
                                <div>No bids yet</div>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.placeholder}>
                            Preview of your new collectible
                        </div>
                    )}
                </div>
            </div>
            {fields.unlockContent && (
                <div className={classes.unlockableContent}>
                    <span>{fields.unlockContent}</span>
                </div>
            )}
        </div>
    )
}

export default Preview
