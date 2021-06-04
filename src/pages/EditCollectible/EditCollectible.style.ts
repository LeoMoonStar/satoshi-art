import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
	return {
		headers: {
			marginLeft: 100
		},
		goBack: {
            margin: '44px 0 18px',
            display: 'flex',
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            textDecoration: 'none',
            color: '#000',
            '& svg': {
                marginRight: 12,
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 57,
        },
        leftCol: {
            flex: '1 1 833px'
        },
        rightCol: {
            backgroundSize: 'cover',
            '& img': {
                objectFit: 'cover',
                height: '100%',
            },
        },
        ownerContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 18
        },
        imageWrapper: {
            position: 'relative',
        },
        artistInfo: {
            marginLeft: 13,
        },
        artistRole: {
            color: theme.custom.common.darkerGrayColor,
        },
        fileWrapper: {
        	backgroundColor: 'grey',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            position: 'relative',
            width: 885,
            height: 959,
            '& > *': {
                width: '100%',
                height: 'auto',
                maxHeight: 709,
            },
            '& > img': {
                objectFit: 'contain',
            },
        },
        iconsContainer: {
            display: 'flex',
            float: 'right',
            position: 'absolute',
            top: 28,
            right: 17,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        artLabel: {
            color: theme.custom.common.pinkColor,
        },
        inputError: {
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            color: 'red',
        },
        form: {
            marginTop: 60,
            '& label': {
                marginBottom: 20,
                fontSize: 14,
                color: '#7E7E7E',
            },
            '& .MuiInputBase-input': {
                height: 46,
                borderRadius: 60,
                border: '1px solid #A5A5A5',
                boxSizing: 'border-box',
                padding: '0 16px',
            },
            '& .MuiInput-formControl': {
                marginTop: 0,
                '&::before, &::after': {
                    display: 'none',
                },
            },
            '& .MuiSelect-selectMenu': {
                display: 'flex',
                alignItems: 'center',
            },
            '& .MuiSelect-icon': {
                right: 8,
            },
        },
        fieldGroup: {
            width: '70%',
            marginBottom: 40,
            '& Button': {
            	marginTop: 10
            }
        },
        submits: {
        	display: 'flex',
        	flexDirection: 'row',
        	justifyContent: 'space-between',
        	width: '70%',

        	'& Button': {
        		backgroundColor: '#5113D5'
        	}
        }
	}
})

export default useStyles
