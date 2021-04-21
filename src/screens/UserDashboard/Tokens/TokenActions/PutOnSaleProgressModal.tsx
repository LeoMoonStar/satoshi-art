import React from 'react'
import { CircularProgress } from '@material-ui/core'

import useStyles from './Modals.style'
import Modal from 'shared/Modal'
import Button from 'shared/Button'
import { useTranslation } from 'react-i18next'

type PutOnSaleProgressModalProps = {
    isNeedToApprove: boolean
    isPutOnSaleInProgress: boolean
    isApprovalInProgress: boolean
    activeStep: number
    onClose: () => void
    putOnSaleError: string
    approvalError: string
    onTryAgain: () => void
    onTryApproveAgain: () => void
    putOnSale: () => Promise<void>
}

export default function PutOnSaleProgressModal({
    isNeedToApprove,
    isApprovalInProgress,
    isPutOnSaleInProgress,
    activeStep,
    onClose,
    putOnSaleError,
    approvalError,
    onTryAgain,
    onTryApproveAgain,
    putOnSale,
}: PutOnSaleProgressModalProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <Modal open onClose={onClose}>
            <div className={classes.container}>
                <div className={classes.title}>Processing...</div>
                <div className={classes.stepsContent}>
                    {putOnSaleError ? (
                        <div className={classes.step}>
                            <div className={classes.stepDescription}>
                                <div className={classes.stepTitle}>
                                    <span className={classes.textError}>
                                        {putOnSaleError}
                                    </span>
                                </div>
                            </div>
                            <Button
                                variantCustom="action"
                                className={classes.buttonFilled}
                                onClick={onTryAgain}
                            >
                                {t('tryAgain')}
                            </Button>
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </Modal>
    )
}
