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
            maxWidth: 1500,
            margin: '0 auto',
            marginBottom: 120,
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
        newTokensContainer: {
            width: 350,
            padding: '32px 64px',
            backgroundColor: '#fff',
            '& button': {
                margin: '0 8px',
            },
        },
        newTokensTitle: {
            fontSize: 30,
            lineHeight: '30px',
            textAlign: 'center',
            fontWeight: 800,
            borderBottom: '1px solid #6A2FE74D',
            paddingBottom: 10,
        },
        newTokensContent: {
            margin: '32px 8px',
            fontSize: 16,
            color: '#7E7E7E',
        },
    }
})
export default useStyles
