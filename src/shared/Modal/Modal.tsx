import React from 'react'
import { Modal as MUIModal } from '@material-ui/core'
import useStyles from './Modal.style'

type ModalProps = {
    open: boolean
    children: unknown
    onClose: (event: React.MouseEvent<HTMLElement>) => void
}

const Modal: React.FC<ModalProps> = ({ open, children, onClose }) => {
    const classes = useStyles()

    return (
        <MUIModal open={open} onClose={onClose}>
            <div className={classes.wrapper}>
                {children}
                <button onClick={onClose} className={classes.closeBtn}>
                    x
                </button>
            </div>
        </MUIModal>
    )
}

export default Modal
