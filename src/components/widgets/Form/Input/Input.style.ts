import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        input: {
            '& .MuiInput-root': {
                width: '100%',
                borderBottom: '1px solid #7E7E7E4D',
            },
            '& span': {
                display: 'inline-block',
                marginTop: 8,
                lineHeight: '16px',
                fontSize: 12,
                color: theme.custom.common.grayColor,
            },
            '& input+span': {
                fontSize: 16,
            },
        },
        label: {
            fontWeight: 600,
            display: 'block',
            cursor: 'pointer',
            fontSize: 18,
            lineHeight: '23px',
            color: theme.custom.common.blackColor,
            marginBottom: 24,
        },
    }
})
export default useStyles
