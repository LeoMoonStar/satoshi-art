import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: 286,
            display: 'flex',
            boxSizing: 'border-box',
            padding: '0 18px',
            '& ul': {
                margin: 0,
                padding: 0,
                listStyle: 'none',
            },
            '& li': {
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: 63,
                borderBottom: '1px solid #C4C4C4',
            },
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
