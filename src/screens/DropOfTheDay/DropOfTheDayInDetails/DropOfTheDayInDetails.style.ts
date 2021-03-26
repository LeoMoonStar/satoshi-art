import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            boxSizing: 'border-box',
            padding: '0 235px',
        },
        info: {
            width: 569,
        },
        title: {
            fontWeight: 800,
            fontSize: 36,
            color: '#7E7E7E',
        },
        content: {
            fontSize: 16,
            color: '#7E7E7E',
            '& p': {
                margin: 0,
            },
            '& span': {
                color: '#FF0099',
                '& a': {
                    color: '#FF0099',
                    '&:hover': {
                        fontWeight: 600,
                        textDecoration: 'none',
                    },
                },
            },
        },
        row: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 80,
            '&:nth-child(2)': {
                marginBottom: 160,
            },
            '&:nth-child(2n)': {
                flexDirection: 'row-reverse',
            },
        },
        iconWrap: {
            position: 'relative',
            display: 'flex',
            '& img': {
                position: 'relative',
                zIndex: 1,
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                width: 246,
                height: 246,
                right: 36,
                bottom: 36,
                display: 'block',
                borderRadius: '50%',
                backgroundColor: '#FFE600',
            },
        },
    }
})

export default useStyles
