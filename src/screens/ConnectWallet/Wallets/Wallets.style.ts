import { makeStyles } from '@material-ui/core/styles'
import connectWalletBackground from 'shared/images/connectWalletBackground.png'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            height: 830,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `url(${connectWalletBackground})`,
            backgroundSize: 'cover',
        },
        walletsModal: {
            height: 490,
            width: 765,
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 30,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: 'calc(50% - 245px)',
            left: 'calc(50% - 360px)',
        },
        modalHeader: {
            height: 130,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 60,
            paddingRight: 60,
        },
        content: {
            height: 'calc(100% - 130px)',
            display: 'flex',
            paddingLeft: 60,
            paddingRight: 60,
        },
        info: {
            width: '50%',
        },
        connectors: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 60,
        },
        connectBtn: {
            width: 280,
            height: 54,
            backgroundColor: theme.palette.primary.main,
            color: 'black',
            border: `1px solid ${theme.custom.common.grayColor}`,
            borderRadius: 40,
        },
    }
})
export default useStyles
