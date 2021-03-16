import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: theme.palette.primary.main,
        },
        header: {
            minHeight: 130,
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.primary.main,
            zIndex: 9999,
        },
        content: {
            flex: '1 0 auto',
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
