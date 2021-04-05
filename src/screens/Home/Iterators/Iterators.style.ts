import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'relative',
            zIndex: 1,
            width: '100%',
            margin: '46px 0 59px',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            boxSizing: 'border-box',
            padding: '0 132px',
        },
        mainTitle: {
            width: '100%',
            fontWeight: 800,
            fontSize: 30,
        },
        card: {
            width: 266,
            textAlign: 'center',
        },
        image: {
            width: 266,
            borderRadius: '50%',
        },
        name: {
            margin: '31px 0 35px',
            fontSize: 30,
            fontWeight: 800,
        },
        buttonRow: {
            width: '100%',
            textAlign: 'center',
            '& button': {
                height: 53,
            },
        },
    }
})
export default useStyles
