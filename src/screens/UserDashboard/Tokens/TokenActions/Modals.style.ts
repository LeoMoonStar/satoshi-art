import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'relative',
            width: 400,
            backgroundColor: '#fff',
            padding: '20px 64px',
            boxSizing: 'border-box',
            border: 0,
            outline: 0,
            borderRadius: 20,
        },
        modal: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontWeight: 900,
            fontSize: 32,
            marginTop: 14,
            paddingBottom: 16,
            color: '#000',
            textAlign: 'center',
            borderBottom: '1px solid #6A2FE730',
        },
        priceValueType: {
            fontWeight: 600,
            color: '#7E7E7E',
        },
        fieldGroup: {
            width: '100%',
            marginBottom: 14,
            borderBottom: 1,
            '& .MuiInputBase-input': {
                fontSize: 13,
                marginTop: 6,
                fontWeight: 500,
                '&::placeholder': {
                    color: '#7E7E7E',
                },
            },
            '& label.Mui-focused': {
                color: '#000',
                '& small': {
                    color: '#7E7E7E',
                },
            },
            '& .Mui-focused.MuiInput-underline::after, .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '1px solid #ff0099',
            },
            '& label': {
                fontWeight: 700,
                fontSize: 18,
                color: '#000',
                '& small': {
                    fontWeight: 400,
                    color: '#7E7E7E',
                },
            },
        },
        additionalInfo: {
            margin: '10px 0',
            fontWeight: 500,
            listStyle: 'none',
            color: '#7E7E7E',
            padding: 0,
        },
        buttons: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginTop: 40,
            flexDirection: 'column',
        },
        buttonFilled: {
            minWidth: 240,
        },
        cancelButton: {
            marginTop: 10,
            minWidth: 240,
            '& span': {
                display: 'inline-block',
                color: '#FF0099',
                background: '-webkit-linear-gradient(left, #6A2FE7, #FF0099)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            },
        },
        stepsContent: {
            marginTop: 40,
        },
        step: {
            marginTop: 28,
            '& .MuiButton-root': {
                marginTop: 30,
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
        },
        stepTitle: {
            marginLeft: 20,
            '& span': {
                color: '#7E7E7E',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '-0.04em',
                display: 'block',
                '&:first-child': {
                    color: '#000000',
                },
            },
        },
        loader: {
            flexShrink: 0,
        },
        textError: {
            color: '#FF0000 !important',
        },
    }
})

export default useStyles
