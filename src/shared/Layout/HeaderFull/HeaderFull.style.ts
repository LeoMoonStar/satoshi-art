import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            backgroundColor: '#fff',
            height: 178,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flexStart',
        },
        topRow: {
            width: '100%',
            height: 52,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #C4C4C4',
        },
        bottomRow: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: 64,
            borderBottom: '1px solid #C4C4C4',
        },
        buttons: {
            display: 'flex',
            margin: '-20px 136px auto auto',
            '& button': {
                textTransform: 'initial',
            },
        },
        navigation: {
            display: 'flex',
            gap: 30,
            marginLeft: 69,
            fontSize: 13,
            fontWeight: 600,
            '& a': {
                color: '#C4C4C4',
                textDecoration: 'none',

                '&:hover': {
                    color: '#000',
                },
            },
        },
        searchGroup: {
            margin: 'auto 0 -26px 136px',
        },
        logo: {
            marginTop: 19,
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
        createLink: {
            textDecoration: 'none',
        },
        createBtn: {
            width: 157,
            height: 40,
            backgroundColor: theme.custom.common.purpleColor,
            color: theme.palette.primary.main,
            borderRadius: 40,
            marginLeft: 12,
            transition: 'transform .25s',
            '&:hover': {
                transform: 'scale(1.03,1.03)',
                backgroundColor: theme.custom.common.purpleColor,
            },
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
