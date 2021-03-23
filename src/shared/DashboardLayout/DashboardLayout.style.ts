import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '259px 1fr',
            gap: 43,
        },
    }
})
export default useStyles
