import React from 'react'
import { Modal as MUIModal, IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Close } from '@material-ui/icons'

import useStyles from './Modal.style'

type ModalProps = {
    open: boolean
    children: unknown
    onClose: (event: React.MouseEvent<HTMLElement>) => void
    className?: string
}

const Modal: React.FC<ModalProps> = ({
    open,
    children,
    onClose,
    className = '',
}) => {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <MUIModal open={open} className={className} onClose={onClose}>
            <div className={classes.wrapper}>
                {children}

                <IconButton
                    className={classes.closeBtn}
                    title={t('close')}
                    onClick={onClose}
                >
                    <Close />
                </IconButton>
            </div>
        </MUIModal>
    )
}

export default Modal
