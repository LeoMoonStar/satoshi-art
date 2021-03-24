import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        preview: {
            marginLeft: 132,
        },
        subtitle: {
            fontWeight: 600,
            fontSize: 18,
            lineHeight: '23px',
            marginBottom: 24,
        },
        previewArea: {
            position: 'relative',
            width: 268,
            height: 346,
            background: theme.palette.primary.main,
            border: '1px solid #E5E5E5',
            borderRadius: 20,
        },
        info: {
            width: 170,
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: 16,
            lineHeight: '20px',
            fontWeight: 600,
            textAlign: 'center',
            color: theme.custom.common.darkerGrayColor,
            transform: 'translateX(-50%) translateY(-50%)',
        },
    }
})
export default useStyles
