import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 48,
        },
        card: {
            position: 'relative',
            zIndex: 1,
            width: 1168,
            display: 'flex',
            alignItems: 'flex-end',
            height: 341,
            borderRadius: 20,
        },
        whiteSliderDots: {
            '& .slick-dots button': {
                backgroundColor: '#fff',
            },
        },
        leftCol: {
            marginLeft: 110,
            display: 'flex',
            '& h3': {
                position: 'absolute',
                margin: 0,
                left: 50,
                bottom: 32,
                lineHeight: '80px',
                letterSpacing: '-0.04em',
                zIndex: 3,
                width: 185,
                fontSize: 80,
                fontWeight: 800,
                color: '#fff',
            },
            '& img': {
                position: 'absolute',
                bottom: 0,
                left: 107,
                zIndex: 2,
            },
        },
        rightCol: {
            position: 'relative',
            zIndex: 3,
            marginLeft: 'auto',
            marginRight: 50,
            padding: '0 50px',
            boxSizing: 'border-box',
            width: 'calc(100% - 510px)',
            '& .slick-arrow:hover': {
                '& circle': {
                    fill: '#fff',
                },
                '& path': {
                    fill: '#7E7E7E',
                },
            },
        },
        colorsDissolving: {
            position: 'absolute',
            top: '-30%',
            right: 0,
            zIndex: 0,
        },
    }
})
export default useStyles
