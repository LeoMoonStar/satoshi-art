import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            width: '100%',
            height: 108,
            display: 'flex',
            alignItems: 'center',
            paddingRight: 37,
            boxSizing: 'border-box',
        },
        profileInfo: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 26,
            borderLeft: '1px solid #D0D6DE',
        },
        greeting: {
            marginLeft: 30,
            fontSize: 12,
            marginRight: 14,
        },
        searchWrapper: {
            width: 628,
            marginRight: 'auto',
            display: 'flex',
            maxWidth: '100%',
            height: 42,
            border: '1px solid #EBEBEB',
            borderRadius: 20,
            backgroundColor: '#FDFDFD',
            boxSizing: 'border-box',
        },
        searchInput: {
            padding: '0 18px',
            boxSizing: 'border-box',
            flex: '1 1 100%',
            fontSize: 12,
            '&::placeholder': {
                color: '#969BA0',
            },
        },
        searchButton: {
            flex: '1 0 auto',
            '& svg': {
                width: 20,
                height: 20,
            },
        },
        notifies: {
            position: 'relative',
            width: 60,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid #FF0099',
            borderRadius: 20,
            '& svg': {
                stroke: theme.custom.common.pinkColor,
            },
        },
        notifiesCount: {
            width: 24,
            height: 24,
            position: 'absolute',
            top: -12,
            left: -12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: theme.custom.common.pinkColor,
            color: '#fff',
        },
    }
})
export default useStyles
