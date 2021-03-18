import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 50,
        },
        logo: {
            marginLeft: 68,
        },
        controls: {
            marginRight: 68,
            display: 'flex',
        },
        connectWalletBtn: {
            width: 157,
            height: 40,
            backgroundColor: theme.custom.common.pinkColor,
            color: theme.palette.primary.main,
            borderRadius: 40,
        },
        createBtn: {
            width: 157,
            height: 40,
            backgroundColor: theme.custom.common.purpleColor,
            color: theme.palette.primary.main,
            borderRadius: 40,
            marginLeft: 12,
        },
        searchWrapper: {},
        search: {
            position: 'relative',
        },
        searchIcons: {
            position: 'absolute',
            justifyContent: 'space-between',
            top: 14,
            left: 10,
            display: 'flex',
            width: 190,
        },
        searchInput: {
            height: 40,
            width: 220,
            border: `1px solid ${theme.custom.common.grayColor}`,
            borderRadius: 40,
            marginRight: 12,
            paddingLeft: 15,
            zIndex: 9999,

            '&:focus-within': {
                backgroundColor: theme.palette.primary.main,
            },
        },
    }
})
export default useStyles
