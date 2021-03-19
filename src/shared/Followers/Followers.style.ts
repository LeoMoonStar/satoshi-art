import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 30,
            padding: 20,

            '&:focus': {
                outline: 0,
            },
        },
        header: {
            display: 'flex',
        },
        closeBtn: {
            alignSelf: 'flex-start',
            backgroundColor: theme.palette.primary.main,
            border: 'none',
            cursor: 'pointer',
            fontSize: 20,
            fontWeight: 400,
        },
    }
})
export default useStyles
