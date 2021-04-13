import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 30,
            margin: '32px 0',
        },
        col: {
            // flex: 1,
            display: 'flex',
        },
    }
})

export default useStyles
