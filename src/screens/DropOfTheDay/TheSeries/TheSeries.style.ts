import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            padding: '108px 138px 80px',
        },
        leftCol: {
            minWidth: 368,
            boxSizing: 'border-box',
            paddingRight: 110,
        },
        rightCol: {},
        mainTitle: {
            margin: '0 0 24px',
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#4D0ED2',
        },
        content: {
            fontSize: 16,
            lineHeight: '22px',
            color: '#7E7E7E',
        },
        slider: {
            '& .slick-arrow circle': {
                stroke: '#7E7E7E',
            },
            '& .slick-arrow path': {
                fill: '#7E7E7E',
            },
        },
    }
})
export default useStyles
