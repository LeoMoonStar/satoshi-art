import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center ',
        },
        topRow: {
            position: 'relative',
            height: 53,
            width: '100%',
            display: 'flex',
            alignItems: 'center ',
            borderBottom: '1px solid #ffffff50',
        },
        divider: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 1,
            backgroundColor: '#C4C4C4',
        },
        bottomRow: {
            display: 'flex',
            width: '100%',
            height: 51,
            borderBottom: '1px solid #C4C4C4',
        },
        innerBottomRow: {
            width: '100%',
            marginTop: -55,
            display: 'flex',
            alignItems: 'center ',
            justifyContent: 'space-between',
        },
        logo: {
            marginLeft: 20,
        },
        autocomplete: {
            position: 'relative',
            zIndex: 999,
            width: 672,

            '&[aria-expanded="true"] .MuiAutocomplete-inputRoot[class*="MuiInput-root"]': {
                borderRadius: '20px 20px 0 0',
            },
            '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"]': {
                paddingLeft: 67,

                '&::placeholder': {
                    color: theme.custom.common.grayColor,
                    fontSize: 14,
                    opacity: 1,
                },
            },
        },
        searchInput: {
            height: 53,
            width: '100%',
            paddingRight: 8,
            border: `1px solid ${theme.custom.common.grayColor}`,
            borderRadius: 60,
            '& .MuiAutocomplete-endAdornment': {
                display: 'none',
            },
        },
        dropdown: {
            marginTop: -16,
            zIndex: 9,
            '& .MuiPaper-root': {
                boxShadow: 'none',
                margin: 0,
                '& .MuiAutocomplete-listbox, .MuiAutocomplete-noOptions': {
                    borderRadius: '0 0 20px 20px',
                    border: `1px solid ${theme.custom.common.grayColor}`,
                    borderWidth: '0 1px 1px 1px',
                    padding: '10px 0 0 0',
                },
                '& .MuiAutocomplete-noOptions': {
                    padding: '15px 0 15px 67px',
                    color: theme.custom.common.grayColor,
                    fontSize: 14,
                },
                '& .MuiAutocomplete-option': {
                    padding: '8px 0',
                    color: theme.custom.common.grayColor,
                    fontSize: 14,

                    '& svg': {
                        width: 20,
                        height: 20,
                        marginLeft: 21,
                        marginRight: 26,
                    },
                },
            },
        },
        controls: {
            display: 'flex',
            marginRight: 72,
            marginLeft: 'auto',
        },
        createLink: {
            marginRight: 12,
            textDecoration: 'none',
            '& button[class]:hover': {
                transform: 'scale(1.03, 1.03)',
                backgroundColor: '#5113D5',
            },
        },
        searchWrapper: {
            pointerEvents: 'none',
            backgroundColor: theme.palette.primary.main,
            position: 'relative',
            marginLeft: 200,
            width: 672,
            borderRadius: 60,
        },
        searchIcon: {
            position: 'absolute',
            transform: 'translate(0, -50%)',
            top: '50%',
            left: 21,
            display: 'flex',
            zIndex: 998,

            '& svg': {
                width: 20,
                height: 20,
            },
        },
        connectLink: {
            marginRight: 24,
            textDecoration: 'none',
            '& button[class]:hover': {
                transform: 'scale(1.03, 1.03)',
                backgroundColor: '#ff0099',
            },
        },
        controlButtonsWrapper: {
            position: 'relative',
            minWidth: 94,
            height: 40,
            marginRight: 24,
            borderRadius: 60,
            backgroundColor: '#fff',
            border: '1px solid #C4C4C4',
            display: 'flex',
            justifyContent: 'center',
        },
        howItWorksLink: {
            textDecoration: 'none',
            '& button': {
                minWidth: 157,
                height: 40,
                margin: '0 12px',
                textDecoration: 'none',
                fontWeight: 600,
                color: '#C4C4C4',
                whiteSpace: 'nowrap',
                border: '1px solid #C4C4C4',
                borderRadius: 60,
                backgroundColor: '#fff',
                textTransform: 'initial',
                '&:hover': {
                    backgroundColor: '#fff',
                    transform: 'scale(1.03, 1.03)',
                },
            },
        },

        howItWorksLinkInverse: {
            '& button': {
                color: '#fff',
                backgroundColor: 'transparent',
                border: '1px solid #fff',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }
})
export default useStyles
