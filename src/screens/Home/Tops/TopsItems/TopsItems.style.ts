import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        topsItems: {
            listStyleType: 'none',
        },
        item: {
            color: theme.palette.primary.main,
        },
    }
})
export default useStyles
