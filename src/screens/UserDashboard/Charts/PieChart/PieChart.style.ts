import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            boxSizing: 'border-box',
            border: '1px solid #E5E5E5',
            borderRadius: 10,
            padding: '20px 25px',
        },
        checkboxGroup: {
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            '& label': {
                marginRight: 19,
                fontSize: 13,
                fontWeight: 600,
            },
        },
        head: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 16,
        },
        intro: {
            maxWidth: 230,
        },
        mainTitle: {
            marginTop: 0,
            marginBottom: 4,
            fontSize: 18,
            color: '#000',
        },
        helpText: {
            fontSize: 12,
            color: '#C4C4C4',
        },
        col: {
            width: 116,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            margin: '0 auto',
            '& b': {
                display: 'block',
                width: '100%',
                whiteSpace: 'pre-line',
                textAlign: 'center',
                marginTop: 19,
                fontSize: 13,
                fontWeight: 600,
            },
        },
        showMoreButton: {
            padding: 2,
            '& svg': {
                width: 13,
                '& path': {
                    stroke: '#C4C4C4',
                },
            },
        },
        controlsPaper: {
            border: '1px solid #C4C4C4',
            borderRadius: 20,
        },
        controlsButtons: {
            display: 'flex',
            flexDirection: 'column',
            padding: '13px 0',
            '& button': {
                display: 'flex',
                alignItems: 'center',
                minWidth: 160,
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                padding: '7px 18px',
                border: 0,
                color: '#7E7E7E',
                cursor: 'pointer',
                fontSize: 12,
                letterSpacing: '-0.04em',
                '& div': {
                    width: 12,
                    marginRight: 10,
                },
                '&:hover': {
                    color: '#000',
                    '& svg path': {
                        stroke: '#333 !important',
                    },
                },
            },
        },
    }
})

export default useStyles
