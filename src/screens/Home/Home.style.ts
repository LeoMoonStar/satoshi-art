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
        explore: {
            width: '100%',
            display: 'flex',
        },
        exploreBlock: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        exploreButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 40,
            border: `1px solid ${theme.custom.common.grayColor}`,
        },
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
            borderRadius: 40,
        },
        topsItems: {},
    }
})
export default useStyles
