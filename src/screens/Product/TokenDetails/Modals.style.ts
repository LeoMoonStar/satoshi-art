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
            marginLeft: 35,
        },
        buttonOutlined: {
            minWidth: 170,
            marginLeft: 35,
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
        fsModal: {
            backgroundColor: 'rgb(18, 18, 18)',
            display: 'flex',
            flexDirection: 'column',
        },
        collectibleWrapper: {
            display: 'flex',
            flex: '1 0 auto',
            flexDirection: 'column',
            alignItems: 'stretch',
            maxWidth: '100%',
            padding: 20,
        },
        collectibleItem: {
            maxWidth: 600,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',

            '& img': {
                width: '100%',
            },
        },
        fsModalHeader: {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '20px 16px',
        },
        fsModalFooter: {
            padding: '20px 16px',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,

            '& span': {
                color: '#ffffff80',
            },
            '& a': {
                color: 'inherit',
                textDecoration: 'none',
            },
        },
    }
})

export default useStyles
