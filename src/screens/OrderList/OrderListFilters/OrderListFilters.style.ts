import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 0 30px',
        },
        titleGroup: {
            marginRight: 'auto',
        },
        mainTitle: {
            margin: '0 0 7px 0',
            fontSize: 24,
            fontWeight: 600,
        },
        infoText: {
            color: '#C4C4C4',
        },
        selectIcon: {
            marginRight: 10,
        },
        filter: {
            marginLeft: 16,
            fontSize: 13,
            '& .MuiSelect-root': {
                minWidth: 170,
                height: 30,
            },
        },
    }
})
export default useStyles
