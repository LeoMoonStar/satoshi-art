import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            boxSizing: 'border-box',
            padding: '147px 236px 100px',
        },
        goBack: {
            display: 'block',
            marginRight: 'auto',
            fontSize: 20,
            fontWeight: 600,
            textTransform: 'initial',
            '& svg': {
                marginRight: 7,
            },
        },
        settings: {
            width: 568,
        },
        title: {
            display: 'inline-block',
            fontWeight: 800,
            fontSize: 30,
            lineHeight: '38px',
            borderBottom: '1px solid #6A2FE74D',
            paddingBottom: 7,
            marginBottom: 20,
        },
    }
})
export default useStyles
