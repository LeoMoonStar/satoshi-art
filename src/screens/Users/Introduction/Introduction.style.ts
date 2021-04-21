import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            padding: '0 70px',
        },
        title: {
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: '-0.04em',
            margin: 0,
        },
        resultsCount: {
            fontSize: 20,
            color: '#7E7E7E',
            margin: '0 auto 0 12px',
        },
        select: {
            minWidth: 166,
            height: 40,
            marginLeft: 16,
            '& .MuiSvgIcon-root': {
                marginLeft: 5,
            },
            '& > div': {
                fontSize: 13,
                height: 27,
                letterSpacing: '-0.04em',
                fontWeight: 600,
                color: '#7E7E7E',
            },
        },
        rightCol: {
            display: 'flex',
            flexDirection: 'column',
        },
        filterGroup: {
            display: 'flex',
            alignItems: 'center',
            marginTop: 25,
        },
        tabs: {
            '& button': {
                marginRight: 4,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.04em',
                backgroundColor: 'transparent',
                border: 0,
                color: '#7E7E7E',
                cursor: 'pointer',
                '&.selected': {
                    color: '#000',
                },
            },
        },
        selectsGroup: {},
        filterButton: {},
    }
})
export default useStyles
