import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
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
})
export default useStyles
