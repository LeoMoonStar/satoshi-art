import React from 'react'
import { CircularProgress } from '@material-ui/core'

import useStyles from './Modals.style'
import Modal from 'shared/Modal'
import Button from 'shared/Button'

type PutOnSaleProgressModalProps = {
    onClose: () => void
}

export default function PutOnSaleProgressModal({
    onClose,
}: PutOnSaleProgressModalProps): JSX.Element {
    const classes = useStyles()

    return (
        <Modal open onClose={onClose}>
            <div className={classes.container}>
                <div className={classes.title}>Processing...</div>
                <div className={classes.stepsContent}>
                    <div className={classes.step}>
                        <div className={classes.stepDescription}>
                            <CircularProgress size={22} color="secondary" />
                            <div className={classes.stepTitle}>
                                <span>Put your token on sale</span>
                                <span>
                                    Put your token on sale using your wallet
                                </span>
                            </div>
                        </div>
                        <Button className={classes.buttonFilled}>
                            Follow wallet instructions
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
