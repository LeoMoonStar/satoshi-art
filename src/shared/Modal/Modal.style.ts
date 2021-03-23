import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        outline: 0,
    },
    closeBtn: {
        position: 'absolute',
        backgroundColor: theme.palette.primary.main,
        border: 'none',
        cursor: 'pointer',
        fontSize: 20,
        fontWeight: 400,
        top: 21,
        right: 23,

        '&:focus': {
            outline: 0,
        },
    },
}))

export default useStyles
