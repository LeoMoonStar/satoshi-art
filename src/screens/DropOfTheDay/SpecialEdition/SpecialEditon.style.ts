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
        },
        specialEditionCard: {
            marginTop: -60,
            width: '100%',
            display: 'flex',
            borderRadius: 20,
            padding: '60px 100px',
            backgroundColor: '#4D0ED2',
            gap: 100,
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
                listStyleImage: `url(${arrowOfListImage})`,
                margin: '24px 0',
                '& li': {
                    marginBottom: '.5em',
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
        productPage: {},
        additionalInfo: {
            color: '#fff',
        },
    }
})
export default useStyles
