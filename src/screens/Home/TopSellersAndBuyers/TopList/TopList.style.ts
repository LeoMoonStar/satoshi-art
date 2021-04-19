import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        group: {
            position: 'relative',
            flex: '1 1 50%',
            display: 'flex',
            justifyContent: 'center',
            boxSizing: 'border-box',
            backgroundColor: '#000',
            borderRadius: 20,
            // '&::after': {
            //     content: '""',
            //     zIndex: 0,
            //     position: 'absolute',
            //     bottom: 84,
            //     right: 0,
            //     width: '90%',
            //     height: 1,
            //     backgroundColor: '#fff',
            // },
            '&:nth-child(2n)::after': {
                right: 'initial',
                left: 0,
            },
        },
        groupWrapper: {
            position: 'relative',
            boxSizing: 'border-box',
        },
        mainTitle: {
            width: '100%',
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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0 100px',
            width: '100%',
            marginLeft: 'auto',
            marginBottom: 40,
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
