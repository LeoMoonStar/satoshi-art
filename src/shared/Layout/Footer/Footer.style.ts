import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        topFooter: {
            height: 240,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 74,
            marginRight: 74,
        },
        bottomFooter: {
            height: 240,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'space-between',
            marginLeft: 74,
            marginRight: 74,
        },
        bottomFooterSection: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
        },
        footerSplitter: {
            height: 1,
            background: 'white',
        },
        emailInput: {
            height: 46,
            width: 400,
            border: `1px solid ${theme.custom.common.grayColor}`,
            borderRadius: 40,
            marginRight: 12,
            paddingLeft: 15,
            color: theme.palette.primary.main,
        },
        subscribeBtn: {
            width: 157,
            height: 46,
            backgroundColor: theme.palette.primary.main,
            color: 'black',
            borderRadius: 40,
            '&:hover': {
                color: theme.palette.primary.main,
                border: `1px solid ${theme.custom.common.grayColor}`,
            },
        },
    }
})
export default useStyles
