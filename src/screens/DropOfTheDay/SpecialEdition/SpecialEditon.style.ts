import { makeStyles } from '@material-ui/core/styles'
import arrowOfListImage from 'shared/images/dropOfTheDay/listArrowWhite.svg'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '0 134px',
        },
        image: {
            width: 468,
            borderRadius: 20,
            marginRight: 100,
        },
        specialEditionCard: {
            marginTop: -60,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            borderRadius: 20,
            padding: '60px 100px',
            backgroundColor: '#4D0ED2',
        },
        infoWrapper: {},
        titleOfSection: {
            margin: '20px 0 30px',
            fontWeight: 800,
            fontSize: 36,
            color: '#fff',
            lineHeight: '32px',
        },
        title: {
            margin: '20px 0 8px',
            fontSize: 30,
            fontWeight: 800,
            color: '#FF0099',
        },
        date: {
            margin: '8px 0 25px',
            fontWeight: 600,
            fontSize: 16,
            color: '#fff',
        },
        content: {
            fontWeight: 400,
            fontSize: 16,
            color: '#fff',
            '& ul': {
                margin: '20px 0',
                paddingLeft: 25,
                listStyleImage: `url(${arrowOfListImage})`,
                '& li': {
                    marginBottom: '.4em',
                },
            },
        },
        linkAsButton: {
            display: 'block',
            marginTop: 25,
            textDecoration: 'none',
            '& button': {
                border: '1px solid #fff',
            },
        },
        additionalInfo: {
            color: '#fff',
        },
    }
})
export default useStyles
