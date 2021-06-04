import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            backgroundColor: 'white',
            borderColor: '#C4C4C4',
            borderRadius: 30,
            borderStyle: 'solid',
            borderWidth: 1,
            height: 300,
            width: 286,
            display: 'flex',
            boxSizing: 'border-box',
            overflowY: 'scroll',
            padding: '0 18px',
            '& ul': {
                margin: 0,
                padding: 0,
                listStyle: 'none',
            },
            '& li': {
                display: 'flex',
                alignItems: 'center',
                height: 63,
                borderBottom: '1px solid #C4C4C4',
                width: 245
            },
            position: 'absolute',
            zIndex: 1
        },
        info: {
            marginLeft: 15,
        },
        title: {},
        time: {},
        justNowTime: {},
    }
})
export default useStyles
