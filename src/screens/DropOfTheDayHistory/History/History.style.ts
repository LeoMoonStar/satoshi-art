import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '85px 136px 120px',
        },
        paginationWrapper: {
            width: 1168,
            display: 'flex',
            justifyContent: 'flex-end',
        },
    }
})
export default useStyles
