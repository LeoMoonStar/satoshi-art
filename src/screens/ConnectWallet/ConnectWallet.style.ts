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
