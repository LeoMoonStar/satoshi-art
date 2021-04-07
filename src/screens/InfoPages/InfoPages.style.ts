import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => {
    return {
        container: {
            padding: '20px 236px 50px',
            flexDirection: 'row',
            marginBottom: 57,
        },
        backBtn: {
            textTransform: 'none',
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 18,

            '& svg': {
                marginRight: 12,
            },
        },
        contentContainer: {
            color: '#7E7E7E',
            fontSize: 14,
            lineHeight: '19px',

            '& h1': {
                margin: '0 0 20px 0',
                display: 'inline-block',
                borderBottom: '1px solid #6A2FE74D',
                fontSize: 30,
                lineHeight: '38px',
                color: '#000000',
                paddingBottom: 5,
            },

            '& h2': {
                margin: '0 0 20px 0',
                fontSize: 18,
                lineHeight: '25px',
                fontWeight: 700,
            },
            '& h3': {
                fontSize: 16,
                margin: '0 0 20px 0',
            },
            '& p': {
                margin: '0 0 20px 0',

                '& span': {
                    display: 'block',
                },
            },
            '& ul': {
                margin: '0 0 20px 0',
                padding: 0,
                listStyle: 'none',
            },
        },
        lastUpdated: {
            display: 'block',
            marginBottom: '44px',
        },
    }
})

export default useStyles
