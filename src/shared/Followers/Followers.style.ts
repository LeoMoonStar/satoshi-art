import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 30,
            padding: 20,

            '&:focus': {
                outline: 0,
            },
        },
        header: {
            display: 'flex',
        },
        tabsWrapper: {
            flex: 1,
        },
        closeBtn: {
            alignSelf: 'flex-start',
            backgroundColor: theme.palette.primary.main,
            border: 'none',
            cursor: 'pointer',
            fontSize: 20,
            fontWeight: 400,
        },
        styledTab: {
            textTransform: 'none',
            minWidth: 'max-content',
            padding: '0px 15px 0px 5px',
            color: theme.custom.common.blackColor,
            opacity: 1,
            fontWeight: 800,
            '&:hover': {
                color: theme.custom.common.pinkColor,
            },
        },
        selectedTab: {
            color: theme.custom.common.pinkColor,
        },
        row: {
            display: 'flex',
            padding: '20px 0',
            borderBottom: `1px solid ${theme.custom.common.purpleColor}`,

            '&:first-of-type': {
                borderTop: `1px solid ${theme.custom.common.purpleColor}`,
            },
        },
        loader: {
            width: '100%',
            margin: '16px 0',
            textAlign: 'center',
            '& svg': {
                animation: '$loader 2s linear infinite',
            },
        },
    }
})
export default useStyles
