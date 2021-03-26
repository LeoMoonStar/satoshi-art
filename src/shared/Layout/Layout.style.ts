import { makeStyles } from '@material-ui/core/styles'

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
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.primary.main,
            zIndex: 999,
        },
        content: {
            flex: '1 0 auto',
            paddingTop: 45,
        },
        footer: {
            background: 'black',
            width: '100%',
            flex: '0 0 auto',
            height: 480,
        },
    }
})
export default useStyles
