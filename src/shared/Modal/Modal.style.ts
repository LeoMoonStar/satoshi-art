import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    wrapper: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        outline: 0,
    },
    closeBtn: {
        position: 'absolute',
        top: 6,
        right: 6,
        minWidth: 48,

        '& svg': {
            width: 16,
        },

        '&:focus': {
            outline: 0,
        },
    },
}))

export default useStyles
