import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        connectWalletBtn: {
            width: 157,
            height: 40,
            backgroundColor: theme.custom.common.pinkColor,
            color: theme.palette.primary.main,
            borderRadius: 40,
        },
        linkStyle: {
            textDecoration: 'none',
        },
        //temporary style for modal
        modalContainer: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max-content',
            backgroundColor: theme.palette.primary.main,
            border: '2px solid #000',
            padding: 20,
        },
    }
})

export default useStyles
