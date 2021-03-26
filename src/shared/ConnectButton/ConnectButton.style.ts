import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        connectWalletBtn: {
            width: 157,
            height: 40,
            backgroundColor: theme.custom.common.pinkColor,
            color: theme.palette.primary.main,
            borderRadius: 40,
            transition: 'transform .25s',
            '&:hover': {
                transform: 'scale(1.03,1.03)',
                backgroundColor: theme.custom.common.pinkColor,
            },
        },
        linkStyle: {
            textDecoration: 'none',
        },
    }
})

export default useStyles
