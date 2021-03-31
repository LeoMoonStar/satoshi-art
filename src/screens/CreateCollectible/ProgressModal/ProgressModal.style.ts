import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            width: 392,
            height: 496,
            background: '#ffffff',
            border: `1px solid ${theme.custom.common.grayColor}`,
            boxSizing: 'border-box',
            borderRadius: 20,
            padding: '27px 41px 0 39px',
        },
        title: {
            color: theme.custom.common.blackColor,
            fontSize: 30,
            lineHeight: '30px',
            textAlign: 'center',
            fontWeight: 800,
            borderBottom: '1px solid #6A2FE74D',
            paddingBottom: 10,
        },
        label: {
            backgroundColor: '#ccc',
            zIndex: 1,
            color: '#fff',
            width: 15,
            height: 15,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        labelContainer: {
            '& span.MuiTypography-root': {
                fontSize: 9,
                fontWeight: 600,
                marginTop: 3,
            },
        },
        active: {
            backgroundColor: '#FF0099',
        },
        completed: {
            backgroundColor: '#FF0099',
        },
        stepsContent: {
            padding: '0 35px 0 31px',
        },
        step: {
            marginTop: 28,
            '&:first-child': {
                marginTop: 0,
            },
            '& .MuiButton-root': {
                width: '100%',
                height: 40,
                padding: 0,
                borderRadius: 60,
                background: '#C4C4C4',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 13,
                color: '#ffffff',
            },
        },
        stepDescription: {
            display: 'flex',
            marginBottom: 16,
        },
        stepTitle: {
            marginLeft: 20,
            '& span': {
                color: '#7E7E7E',
                fontSize: 12,
                fontWeight: 600,
                display: 'block',
                '&:first-child': {
                    color: '#000000',
                },
            },
        },
        loader: {
            flexShrink: 0,
        },
    }
})

export default useStyles
