import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        noData: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            maxWidth: 585,
            color: theme.palette.primary.main,
            backgroundColor: theme.custom.common.grayColor,
            borderRadius: 15,
            fontSize: 20,
            fontWeight: 800,
        },
        imgRow: {
            display: 'flex',
            alignItems: 'center',
            maxWidth: 585,
        },
        img: {
            width: 109,
            height: 83,
            marginLeft: 10,

            '&:first-child': {
                margin: 0,
            },
        },
    }
})
export default useStyles
