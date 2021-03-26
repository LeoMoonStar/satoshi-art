import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        group: {
            flex: '1 1 50%',
            boxSizing: 'border-box',
            backgroundColor: '#000',
            borderRadius: 20,
            '&:nth-child(odd) > div': {
                marginLeft: 'auto',
                '&  > div': {
                    paddingLeft: 120,
                },
            },
            '&:nth-child(even) > div > div': {
                paddingLeft: 115,
            },
        },
        groupWrapper: {
            position: 'relative',
            width: 647,
            boxSizing: 'border-box',
            '&::after': {
                content: '""',
                zIndex: 0,
                position: 'absolute',
                bottom: 24,
                right: 0,
                width: '100%',
                height: 1,
                backgroundColor: '#fff',
            },
        },
        mainTitle: {
            marginTop: 77,
            marginBottom: 31,
            textAlign: 'center',
            fontWeight: 800,
            fontSize: 30,
        },
        topsItem: {
            display: 'flex',
            alignItems: 'center',
            paddingTop: 3,
            marginBottom: 10,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: '#fff',
            },
        },
        seeAll: {
            zIndex: 1,
            margin: '0 auto',
            display: 'block',
            width: 157,
            height: 52,
            marginTop: 42,
            marginBottom: 60,
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#000',
            border: '1px solid #fff',
            borderRadius: 60,
            textTransform: 'initial',
            transition: 'transform 0.25s',

            '&:hover': {
                backgroundColor: '#000',
                transform: 'scale(1.03, 1.03)',
            },
        },
        groupItems: {
            marginLeft: 'auto',
            columnCount: 2,
        },
        index: {
            position: 'relative',
            width: 36,
            height: 36,
            marginRight: 16,
            fontWeight: 600,
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #C4C4C4',
            borderRadius: '100%',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 18,
                left: '100%',
                width: 16,
                height: 1,
                backgroundColor: '#C4C4C4',
            },
        },
        info: {
            marginLeft: 13,
            color: '#fff',
        },
        userName: {
            fontWeight: 600,
        },
        currency: {
            fontSize: 11,
        },
    }
})
export default useStyles
