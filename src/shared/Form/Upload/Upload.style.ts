import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        wrapper: {
            height: 166,
            borderRadius: 20,
            border: '1px dashed #7E7E7E',
        },
        btn: {
            width: 136,
            height: 40,
            color: '#ffffff',
            background: '#FF0099',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '-0.04em',
            borderRadius: 60,
            '&:hover': {
                color: '#ffffff',
                background: '#FF0099',
            },
        },
    }
})
export default useStyles
