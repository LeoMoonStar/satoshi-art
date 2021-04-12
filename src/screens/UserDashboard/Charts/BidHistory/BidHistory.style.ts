import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            boxSizing: 'border-box',
            border: '1px solid #E5E5E5',
            borderRadius: 10,
            padding: '20px 25px',
        },
        head: {
            width: '100%',
            marginBottom: 40,
        },
        intro: {
            maxWidth: 230,
        },
        mainTitle: {
            marginBottom: 4,
            fontSize: 18,
            color: '#000',
        },
        helpText: {
            fontSize: 12,
            color: '#C4C4C4',
        },
    }
})

export default useStyles
