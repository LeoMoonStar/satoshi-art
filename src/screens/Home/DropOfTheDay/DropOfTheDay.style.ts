import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '0 136px',
        },
        mainTitle: {
            width: '100%',
            margin: '16px 0 21px',
            fontSize: 30,
            fontWeight: 800,
        },
        innerContainer: {
            position: 'relative',
            width: '100%',
        },
        card: {
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            height: 341,
            backgroundColor: '#7E7E7E',
            borderRadius: 20,
        },
        leftCol: {
            marginLeft: 110,
            display: 'flex',
            '& h3': {
                position: 'absolute',
                left: 50,
                zIndex: 0,
                width: 185,
                fontSize: 80,
                fontWeight: 800,
                color: '#fff',
            },
            '& img': {
                position: 'relative',
                zIndex: 1,
            },
        },
        rightCol: {
            position: 'relative',
            zIndex: 1,
            marginLeft: -70,
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
