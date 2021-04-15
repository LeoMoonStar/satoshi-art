import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: 400,
        backgroundColor: '#fff',
        padding: 20,
        boxSizing: 'border-box',
        border: 0,
        outline: 0,
        borderRadius: 20,
        '& h2': {
            margin: '10px 0',
        },
        '& p': {
            color: 'red',
        },
        '& button': {
            marginTop: '25px',
        },
    },
}))

export default useStyles
