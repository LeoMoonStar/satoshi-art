import React from 'react'
import { Typography } from '@material-ui/core'
import Modal from 'shared/Modal'
import { useAPIError } from 'hooks/useAPIError'
import useStyles from './APIErrorModal.style'

const APIErrorModal = (): JSX.Element => {
    const { error, removeError } = useAPIError()
    const classes = useStyles()
    const handleSubmit = () => {
        removeError()
    }
    return (
        <Modal open={!!error} onClose={handleSubmit}>
            <div className={classes.modalContainer}>
                <Typography variant="h2">Something went wrong</Typography>
                <Typography variant="h2">{error?.title}:</Typography>
                <Typography>{error?.message}</Typography>
            </div>
        </Modal>
    )
}

export default APIErrorModal
