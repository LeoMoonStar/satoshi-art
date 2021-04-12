import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            margin: '32px 0',
        },
        col: {
            flex: 1,
            '&:not(:first-child)': {
                marginLeft: 30,
            },
        },
    }
})

export default useStyles
