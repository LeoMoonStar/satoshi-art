import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            marginBottom: 63,
        },
        col: {
            flex: 1,
            padding: '23px 29px 32px',
            borderRadius: 10,
            border: '1px solid #E5E5E5',
            '&:not(:first-child)': {
                marginLeft: 15,
            },
        },
        title: {
            fontWeight: 600,
            fontSize: 24,
        },

        // ITEM
        item: {},
        itemInfo: {},
        topRow: {},
    }
})

export default useStyles
