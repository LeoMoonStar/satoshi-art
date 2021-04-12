import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        head: {
            marginTop: 16,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        tokenName: {
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            color: '#000',
            letterSpacing: '-0.04em',
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
        count: {
            fontWeight: 600,
            fontSize: 11,
            color: '#FF0099',
            margin: '8px 0 12px',
        },
        highestBid: {
            marginBottom: 8,
            fontSize: 9,
            fontWeight: 600,
            '& a': {
                color: '#4D0ED2 ',
            },
        },
    }
})

export default useStyles
