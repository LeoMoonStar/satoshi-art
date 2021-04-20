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
        colorsDissolving: {
            position: 'absolute',
            top: '-30%',
            right: 0,
            zIndex: 0,
        },
    }
})
export default useStyles
