import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '80px 16px 140px',
            backgroundColor: '#000',
        },
        mainTitle: {
            width: '100%',
            textAlign: 'center',
            margin: '0 0 28px',
            fontWeight: 800,
            fontSize: 36,
            color: '#FF0099',
        },
        info: {
            width: '100%',
            fontSize: 16,
            color: '#fff',
            textAlign: 'center',
        },
        timer: {
            marginTop: 40,
            display: 'flex',
            color: '#fff',
        },
        col: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flexStart',
            margin: '0 27px',
            '& b': {
                width: '2ch',
                display: 'block',
                fontSize: 80,
                fontWeight: 800,
                lineHeight: '66px',
                letterSpacing: '-0.04em',
                color: '#fff',
            },
            '& span': {
                display: 'block',
                marginTop: 8,
                fontWeight: 600,
                fontSize: 24,
                color: '#fff',
            },
        },
        additionalInfo: {
            width: '100%',
            marginTop: 58,
            fontSize: 16,
            color: '#fff',
            textAlign: 'center',
            '& a': {
                fontWeight: 800,
                textDecoration: 'none',
                color: '#FF0099',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
    }
})
export default useStyles
