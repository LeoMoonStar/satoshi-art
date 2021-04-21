import React from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Step, StepLabel, Stepper } from '@material-ui/core'

import useStyles from './Modals.style'
import Modal from 'shared/Modal'
import Button from 'shared/Button'
import { MyStepCircle } from 'screens/Product/TokenDetails/ProgressModal'
import { CheckIcon } from 'shared/icons'

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

const CONNECTION_STEPS = ['Approval', 'Put On Sale', 'Complete']

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
                {isNeedToApprove && (
                    <Stepper
                        alternativeLabel
                        activeStep={activeStep}
                        classes={{
                            root: classes.stepper,
                        }}
                    >
                        {CONNECTION_STEPS.map((label) => (
                            <Step key={label}>
                                <StepLabel
                                    classes={{
                                        labelContainer: classes.labelContainer,
                                    }}
                                    StepIconComponent={MyStepCircle}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )}
                <div
                    className={
                        isNeedToApprove ? undefined : classes.stepsContent
                    }
                >
                    {isNeedToApprove && (
                        <>
                            {approvalError ? (
                                <div className={classes.step}>
                                    <div className={classes.stepDescription}>
                                        <div className={classes.stepTitle}>
                                            <span className={classes.textError}>
                                                {approvalError}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        disabled={isApprovalInProgress}
                                        variantCustom="action"
                                        className={classes.buttonFilled}
                                        onClick={onTryApproveAgain}
                                    >
                                        {t('tryAgain')}
                                    </Button>
                                </div>
                            ) : (
                                <div className={classes.step}>
                                    <div className={classes.stepDescription}>
                                        {isApprovalInProgress ? (
                                            <CircularProgress
                                                size={22}
                                                color="secondary"
                                            />
                                        ) : (
                                            <CheckIcon />
                                        )}
                                        <div className={classes.stepTitle}>
                                            <span>Approve</span>
                                            <span>
                                                Checking balance and approving
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        disabled={
                                            isApprovalInProgress ||
                                            activeStep !== 0
                                        }
                                        variantCustom="action"
                                        className={classes.buttonFilled}
                                    >
                                        {activeStep !== 0
                                            ? 'Finished'
                                            : 'Follow wallet instructions'}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
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
                                {isPutOnSaleInProgress ? (
                                    <CircularProgress
                                        size={22}
                                        color="secondary"
                                    />
                                ) : (
                                    <CheckIcon />
                                )}
                                <div className={classes.stepTitle}>
                                    <span>Put your token on sale</span>
                                    <span>
                                        Put your token on sale using your wallet
                                    </span>
                                </div>
                            </div>
                            <Button
                                variantCustom="action"
                                disabled={
                                    isPutOnSaleInProgress ||
                                    isApprovalInProgress ||
                                    activeStep !== 1
                                }
                                className={classes.buttonFilled}
                                onClick={() => putOnSale()}
                            >
                                {isPutOnSaleInProgress
                                    ? 'Follow wallet instructions'
                                    : 'Start'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}
