import React, { useState } from 'react'
import {
    Stepper,
    Step,
    StepLabel,
    StepIconProps,
    CircularProgress,
} from '@material-ui/core'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import Modal from 'shared/Modal'
import Button from 'shared/Button'

// import { CheckIcon } from 'shared/icons'
import useStyles from './ProgressModal.style'

const CONNECTION_STEPS = ['Token', 'Complete']

function MyStepCircle(props: StepIconProps) {
    const classes = useStyles()

    const { active, completed } = props

    return (
        <div
            className={clsx(classes.label, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        />
    )
}
type ProgressModalProps = {
    open: boolean
    onClose: () => void
    onTryAgain: () => void
    createTokenError: string
}
export default function ProgressModal({
    open,
    onTryAgain,
    createTokenError,
    onClose,
}: ProgressModalProps): JSX.Element {
    const classes = useStyles()
    const [activeStep] = useState<number>(0)
    const { t } = useTranslation()

    return (
        <Modal open={open} onClose={onClose}>
            <div className={classes.container}>
                <div className={classes.title}>Almost there...</div>
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
                <div className={classes.stepsContent}>
                    {createTokenError ? (
                        <div className={classes.step}>
                            <div className={classes.stepDescription}>
                                <div className={classes.stepTitle}>
                                    <span className={classes.error}>
                                        {createTokenError}
                                    </span>
                                </div>
                            </div>
                            <Button
                                variantCustom="action"
                                className={classes.tryAgain}
                                onClick={onTryAgain}
                            >
                                {t('tryAgain')}
                            </Button>
                        </div>
                    ) : (
                        <div className={classes.step}>
                            <div className={classes.stepDescription}>
                                <CircularProgress
                                    classes={{
                                        root: classes.loader,
                                    }}
                                    size={22}
                                    color="secondary"
                                />
                                <div className={classes.stepTitle}>
                                    <span>Upload files & Mint token</span>
                                    <span>Call contract method</span>
                                </div>
                            </div>
                            <Button className={classes.disableButton}>
                                In progress...
                            </Button>
                        </div>
                    )}
                    {/*<div className={classes.step}>*/}
                    {/*    <div className={classes.stepDescription}>*/}
                    {/*        <CheckIcon />*/}
                    {/*        <div className={classes.stepTitle}>*/}
                    {/*            <span>Upload files & Mint token</span>*/}
                    {/*            <span>Call contract method</span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <Button>In progress...</Button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </Modal>
    )
}
