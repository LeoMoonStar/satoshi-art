import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            display: 'flex',
        },
        bio: {
            marginLeft: 20,
        },
        name: {
            display: 'flex',
            alignItems: 'center',
            color: theme.custom.common.purpleColor,
            fontWeight: 400,
            fontSize: 24,
        },
        actionBtn: {
            height: 20,
            border: `1px solid ${theme.custom.common.purpleColor}`,
            background: theme.palette.primary.main,
            color: theme.custom.common.purpleColor,
            borderRadius: 40,
            marginLeft: 10,
            textTransform: 'none',
        },
        info: {
            color: theme.custom.common.darkerGrayColor,
            marginBottom: 20,
        },
        socialBtns: {
            display: 'flex',
        },
        socialBtn: {
            display: 'flex',
            alignItems: 'center',
            color: theme.custom.common.darkerGrayColor,
            '& span': {
                marginLeft: 5,
            },
            '&:first-of-type': {
                marginRight: 20,
            },
        },
    }
})
export default useStyles
