import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        tops: {
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
        },
        topsHeader: {
            display: 'flex-inline',
            width: '100%',
            textAlign: 'center',
            marginTop: '15px',
            color: theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        topsItem: {
            backgroundColor: 'black',
            width: '50%',
            height: 598,
            borderRadius: 20,
        },
    }
})
export default useStyles
