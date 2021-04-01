import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            boxSizing: 'border-box',
            padding: '60px 136px 100px',
        },
        title: {
            width: '100%',
            margin: '18px 0 20px',
            paddingBottom: 16,
            fontSize: 30,
            lineHeight: '37px',
            fontWeight: 800,
            borderBottom: '1px solid #6A2FE730',
            letterSpacing: '-0.04em',
        },
        contentCard: {
            width: 292,
            marginTop: 33,
        },
        goBack: {
            marginRight: 'auto',
            fontSize: 20,
            fontWeight: 600,
            textTransform: 'initial',
            '& svg': {
                marginRight: 7,
            },
        },
        content: {
            fontSize: 16,
            lineHeight: '22px',
            color: '#7E7E7E',
            marginBottom: 38,
        },
        additionalInfo: {
            lineHeight: '16px',
            fontSize: 12,
            color: '#7E7E7E',
        },
        cards: {
            display: 'flex',
            marginLeft: 'auto',
            '& a:not(:first-child)': {
                marginLeft: 32,
            },
        },
        card: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: 368,
            height: 405,
            boxSizing: 'border-box',
            border: '1px solid #E5E5E5',
            borderRadius: 20,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            transition: '.25s transform',
            '& img': {
                marginTop: 52,
            },
            '&:hover': {
                transform: 'scale(1.03,1.03)',
            },
        },
        cardTitle: {
            width: '100%',
            fontSize: 18,
            margin: '33px 0',
            textAlign: 'center',
        },
    }
})
export default useStyles
