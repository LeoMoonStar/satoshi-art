import { makeStyles } from '@material-ui/core/styles'

// TODO: Make footer height 480 when the newsletter sign up form returns
const useStyles = makeStyles((theme) => {
    return {
        container: {
            minHeight: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: theme.palette.primary.main,
        },
        header: {
            width: '100%',
            top: 0,
            zIndex: 9,
        },
        content: {
            flex: '1 0 auto',
        },
        footer: {
            background: 'black',
            borderRadius: '20px 20px 0 0',
            width: '100%',
            flex: '0 0 auto',
            height: 240,
        },
    }
})
export default useStyles
