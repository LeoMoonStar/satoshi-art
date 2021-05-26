import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    box: {
        backgroundColor: '#E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-around',
        width: '100%'
    },
    loginBox: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: 300,
        justifyContent: 'space-around',
        margin: '0 auto',
        width: 500
    },
    loginHeader: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginInputBox: {
        margin: '0 auto',
        width: 280
    },
    loginInput: {
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 3,
        fontSize: 15,
        margin: '20px 0',
        padding: 10,
        outline: 'none',
        width: 254
    },
    loginSubmit: {
        margin: '0 auto',
        width: 100
    }
}))

export default useStyles
