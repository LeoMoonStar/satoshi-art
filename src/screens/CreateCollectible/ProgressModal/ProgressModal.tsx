import React, { useState } from 'react'
import {
    Stepper,
    Step,
    StepLabel,
    StepIconProps,
    CircularProgress,
} from '@material-ui/core'
import clsx from 'classnames'
import Modal from 'shared/Modal'
import Button from 'shared/Button'

import { CheckIcon } from 'shared/icons'
import useStyles from './ProgressModal.style'

const CONNECTION_STEPS = ['Approval', 'Token', 'Sign', 'Complete']

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
}
export default function ProgressModal({
    open,
    onClose,
}: ProgressModalProps): JSX.Element {
    const classes = useStyles()
    const [activeStep] = useState<number>(0)

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
                                <span>Approve</span>
                                <span>
                                    Approve perfoming transactions with your
                                    wallet
                                </span>
                            </div>
                        </div>
                        <Button>In progress...</Button>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepDescription}>
                            <CheckIcon />
                            <div className={classes.stepTitle}>
                                <span>Upload files & Mint token</span>
                                <span>Call contract method</span>
                            </div>
                        </div>
                        <Button>Start</Button>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepDescription}>
                            <CheckIcon />
                            <div className={classes.stepTitle}>
                                <span>Sign sell order</span>
                                <span>Sign sell order using your wallet</span>
                            </div>
                        </div>
                        <Button>Start</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
