import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        title: {
            margin: '110px 0 0',
            fontWeight: 800,
            fontSize: 48,
            lineHeight: '53px',
            color: '#7E7E7E',
        },
        subTitle: {
            margin: '0 0 53px',
            fontWeight: 800,
            fontSize: 65,
            lineHeight: '72px',
            color: '#FF0099',
        },
        container: {
            height: '100%',
            width: '100%',
            boxSizing: 'border-box',
            padding: '0 76px',
        },
        navigation: {
            marginLeft: 'auto',
            '& button': {
                fontWeight: 600,
                textTransform: 'initial',
            },
        },
        filterButton: {
            marginRight: -12,
        },
        filters: {
            display: 'flex',
            marginLeft: 'auto',
            marginBottom: 32,
        },
    }
})
export default useStyles
