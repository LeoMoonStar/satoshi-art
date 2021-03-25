import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            backgroundColor: '#fff',
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
            height: 40,
        },
        buttons: {
            display: 'flex',
            margin: '-22px 136px auto auto',
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
        logo: {
            marginTop: 19,
            marginLeft: 20,
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
    }
})
export default useStyles
