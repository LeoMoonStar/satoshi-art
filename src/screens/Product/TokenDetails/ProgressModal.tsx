import React, { useState } from 'react'
import {
    Stepper,
    Step,
    StepLabel,
    StepIconProps,
    CircularProgress,
} from '@material-ui/core'
import clsx from 'clsx'
import Modal from 'shared/Modal'
import Button from 'shared/Button'

import { CheckIcon } from 'shared/icons'
import useStyles from './ProgressModal.style'

const CONNECTION_STEPS = ['Approval', 'Signture', 'Complete']

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
    onClose: () => void
}
export default function ProgressModal({
    onClose,
}: ProgressModalProps): JSX.Element {
    const classes = useStyles()
    const [activeStep] = useState<number>(0)

    return (
        <Modal open onClose={onClose}>
            <div className={classes.container}>
                <div className={classes.title}>Processing</div>
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
                                <span>Checking balance and approving</span>
                            </div>
                        </div>
                        <Button>In progress...</Button>
                    </div>
                    <div className={classes.step}>
                        <div className={classes.stepDescription}>
                            <CheckIcon />
                            <div className={classes.stepTitle}>
                                <span>Signature</span>
                                <span>Create a signature to place a bid</span>
                            </div>
                        </div>
                        <Button>Start</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
