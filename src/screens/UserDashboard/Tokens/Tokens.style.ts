import { makeStyles } from '@material-ui/core/styles'

const linkStyles = {
    textDecoration: 'none',
    color: '#8900FF ',
    fontWeight: 600,
    '&:hover': {
        textDecoration: 'underline',
    },
}

const useStyles = makeStyles(() => {
    return {
        head: {
            marginTop: 16,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        userInfo: {
            marginBottom: 20,
            fontSize: 9,
            color: '#7E7E7E',
            '& a': linkStyles,
        },
        controls: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        controlButton: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 0,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
                '& div': {
                    transform: 'scale(1.1,1.1)',
                },
            },
            '& div': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 27,
                height: 27,
                borderRadius: '50%',
                transition: 'transform 0.25s',
            },
            '& span': {
                whiteSpace: 'nowrap',
                fontSize: 10,
                color: '#7E7E7E',
            },
        },
        viewButton: {
            '& div': {
                backgroundColor: '#FF009915',
                '& svg': {
                    width: 16,
                    '& path': {
                        fill: '#FF0099 !important',
                    },
                },
            },
        },
        editButton: {
            '& div': {
                backgroundColor: '#00C2FF15',
                '& svg': {
                    width: 13,
                    stroke: '#00C2FF',
                },
            },
        },
        cancelBid: {
            '& div': {
                backgroundColor: '#FFB80015',
                '& svg': {
                    width: 13,
                    stroke: '#FFB800',
                },
            },
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
            '& a': linkStyles,
        },
        createdInfo: {
            fontSize: 9,
            fontWeight: 400,
            color: '#7E7E7E',
            '& a': linkStyles,
        },
    }
})

export default useStyles
