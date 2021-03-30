import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        popover: {
            '& .MuiPopover-paper': {
                width: 284,
                padding: 18,
                background: theme.palette.primary.main,
                border: '1px solid #C4C4C4',
                boxSizing: 'border-box',
                borderRadius: 20,
            },
        },
        nickName: {
            color: theme.custom.common.blackColor,
            fontWeight: 600,
            fontSize: 18,
            lineHeight: '26px',

            '& svg': {
                marginLeft: 5,
            },
        },
        profileLink: {
            color: '#FF0099',
            fontSize: 14,
            lineHeight: '14px',
            textDecoration: 'none',
        },
        balances: {
            margin: '20px 0 0 0',
            padding: '0 0 18px 0',
            borderBottom: '1px solid #C4C4C4',
            listStyle: 'none',

            '& li': {
                display: 'flex',
                alignItems: 'center',
            },
        },
        balance: {
            fontSize: 12,
            marginLeft: 15,
            color: theme.custom.common.darkerGrayColor,
            fontWeight: 600,

            '& span': {
                display: 'block',
            },
            '& span:first-child': {
                color: theme.custom.common.blackColor,
                marginBottom: 7,
            },
        },
        links: {
            listStyle: 'none',
            margin: '20px 0 0 0',
            padding: 0,
            fontSize: 12,
            color: theme.custom.common.darkerGrayColor,

            '& li a': {
                display: 'flex',
                alignItems: 'center',
                marginBottom: 16,
                textDecoration: 'none',
                color: 'inherit',

                '&:hover': {
                    color: theme.custom.common.blackColor,
                },

                '& svg': {
                    width: 15,
                    marginRight: 11,
                },
            },
        },
    }
})
export default useStyles
