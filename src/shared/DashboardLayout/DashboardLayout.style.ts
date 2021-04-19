import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
        },
        sideBar: {
            minWidth: 259,
        },
        content: {
            display: 'flex',
            width: 'calc(100% - 259px)',
        },
    }
})
export default useStyles
