import React from 'react'

import Modal from 'shared/Modal'
import useStyles from './Modals.style'

type BidModalProps = {
    onClose: () => void
    src: string
}

export default function FullScreenModal({
    onClose,
    src
}: BidModalProps): JSX.Element {
    const classes = useStyles()

    return (
        <Modal open className={classes.modal} onClose={onClose}>
            <div>
                <img
                    src={
                        'https://ipfs.rarible.com/ipfs/QmbDxMus9wLt1SSesBGo4qbfmVRtmzdoAtt8X9oSFc6pJt/image.jpeg'
                    }
                    alt={'Token image'}
                />
                <div>
                    <span>JOEL THE SKATER CAT</span>
                    <span>by</span>
                    <a href="#">Author</a>
                    <span>on</span>
                    <a href="#">Site</a>
                </div>
            </div>
        </Modal>
    )
}
