import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        noData: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.primary.main,
            backgroundColor: theme.custom.common.grayColor,
            borderRadius: 15,
            fontSize: 20,
            fontWeight: 800,
        },
        imgRow: {
            display: 'flex',
        },
        img: {
            width: 150,
            height: 100,
            marginLeft: 10,

            '&:fist-child': {
                margin: 0,
            },
        },
    }
})
export default useStyles
