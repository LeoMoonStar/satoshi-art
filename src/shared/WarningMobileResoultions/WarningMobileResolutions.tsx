import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useStyles from './WarningMobileResolutions.style'
import Modal from 'shared/Modal'
import Button from 'shared/Button'

export default function WarningMobileResolutions(): JSX.Element {
    const [isOpen, setOpen] = useState<boolean>(false)
    const history = useHistory()
    const { t } = useTranslation()

    useEffect(() => {
        if (
            window.innerWidth >= 1366 ||
            sessionStorage.getItem('isConfirmedWarningMobileResolutions')
        ) {
            return
        }

        sessionStorage.setItem('isConfirmedWarningMobileResolutions', '1')
        setOpen(true)
    }, [history])

    const classes = useStyles()

    return (
        <Modal
            className={classes.modal}
            onClose={() => setOpen(false)}
            open={isOpen}
        >
            <div className={classes.container}>
                <h2 className={classes.title}>{t('hello')}</h2>
                <div className={classes.content}>
                    {t('thisPageIsBestViewedWithDesktopDevices')}
                </div>
                <Button
                    variantCustom="action"
                    onClick={() => setOpen(false)}
                    className={classes.buttonFilled}
                >
                    {t('proceedAnyway')}
                </Button>
            </div>
        </Modal>
    )
}
