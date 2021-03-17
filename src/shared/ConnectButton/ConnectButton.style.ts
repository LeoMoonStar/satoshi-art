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
    }
})

export default useStyles
