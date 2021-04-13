import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            boxSizing: 'border-box',
            border: '1px solid #E5E5E5',
            borderRadius: 10,
            padding: '20px 25px 5px',
            '& .recharts-cartesian-axis-tick-value': {
                fill: '#000',
            },
        },
        head: {
            width: '100%',
            marginBottom: 10,
        },
        intro: {
            maxWidth: 230,
        },
        mainTitle: {
            marginTop: 0,
            marginBottom: 4,
            fontSize: 18,
            color: '#000',
        },
        helpText: {
            fontSize: 12,
            color: '#C4C4C4',
        },
        customToolTip: {
            backgroundColor: '#fff',
            padding: '8px 10px 8px 20px',
            borderRadius: 10,
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.12)',
        },
        customToolTipTitle: {
            fontSize: 10,
            width: '100%',
        },
        customToolTipDescription: {
            fontSize: 9,
            color: '#C4C4C4',
        },
    }
})

export default useStyles
