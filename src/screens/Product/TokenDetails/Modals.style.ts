import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'relative',
            width: 445,
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
        intro: {
            fontSize: 16,
            textAlign: 'center',
            color: '#7E7E7E',
            marginBottom: 24,
        },
        priceRow: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: '4px 0 8px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
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
        inputHelpText: {
            position: 'absolute',
            right: 0,
            top: 26,
            fontSize: 11,
            fontWeight: 600,
            color: '#7E7E7E',
        },
        additionalInfo: {
            margin: '10px 0',
            fontWeight: 500,
            listStyle: 'none',
            color: '#7E7E7E',
            padding: 0,
            '& li': {
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
            },
        },
        buttonFilled: {
            minWidth: 170,
            lineHeight: '40px',
            padding: 0,
            color: '#fff',
            borderRadius: 60,
            backgroundColor: '#ff0099',
            textTransform: 'initial',
            '&:not(:disabled):hover': {
                backgroundColor: '#ff009990',
            },
            '&:disabled': {
                backgroundColor: '#C4C4C4',
                color: '#fff',
            },
        },
        buttonOutlined: {
            minWidth: 170,
            lineHeight: '40px',
            padding: 0,
            color: '#ff0099',
            borderRadius: 60,
            border: '1px solid #ff0099',
            textTransform: 'initial',
            '&:hover': {
                backgroundColor: '#ff009920',
            },
        },
        buttons: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
            flexDirection: 'column',
        },
        errorMessage: {
            margin: '16px 0 4px',
            width: '100%',
            textAlign: 'center',
            color: 'red',
            fontWeight: 600,
        },
    }
})

export default useStyles
