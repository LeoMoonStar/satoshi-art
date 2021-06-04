import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
	return {
		form: {
            margin: '60px 100px 0 100px',
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




        upload: {
            margin: 32,
            width: '50%'
        },
        uploadWrapper: {
            position: 'relative',
            color: theme.custom.common.darkerGrayColor,
            fontSize: 18,
            padding: '38px 0 32px 0',
            lineHeight: '23px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: '1px dashed #7E7E7E',
            borderRadius: 20,
        },
        closeBtn: {
            position: 'absolute',
            right: 10,
            top: 10,
        },
        uploadPreview: {
            width: 300,

            '& img, & video': {
                width: '100%',
            },
        },
        subtitle: {
            fontWeight: 600,
            fontSize: 18,
            lineHeight: '23px',
            marginBottom: 24,
        },
        chooseBtn: {
            width: 136,
            color: theme.custom.common.pinkColor,
            border: `1px solid ${theme.custom.common.pinkColor}`,
            marginTop: 38,
            borderRadius: 60,
        },
        uploadError: {
            border: '1px solid #FF0000',
        },
        input: {
            marginBottom: 32,
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



		fieldGroup: {
            width: '100%',
            marginTop: 100,
        },
        '& label': {
        	marginTop: 100
        },
        textField: {
        	marginTop: -20,

            '& .MuiInputBase-input': {
                borderRadius: 30,
                height: '223px !important',
                padding: 10
            },
        },
        inputError: {
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            color: 'red',
        },
        date: {
        	marginTop: 100,
        	width: 300,

        	'& div': {
        		fontSize: 30,
        		marginHorizontal: 10
        	},
        	'& input': {
        		borderRadius: 5,
        		borderStyle: 'solid',
        		borderWidth: 1,
        		outline: 'none',
        		padding: 10
        	},
        },
        dateRow: {
        	display: 'flex',
        	flexDirection: 'row',
        	justifyContent: 'space-between',

        	'& input': {
        		width: 50
        	}
        },

        bulletpoints: {
        	marginTop: 100
        },
        bulletpointsAdd: {
        	backgroundColor: 'rgba(0, 0, 0, 0.5)',
        	borderRadius: 5,
        	padding: 10,
        	textAlign: 'center',
        	width: 100,

        	'&:hover': {
        		backgroundColor: 'rgba(0, 0, 0, 0.6)',
        		cursor: 'pointer'
        	}
        },
        bulletpointinput: {
        	borderRadius: 10,
        	fontSize: 20,
        	outline: 'none',
        	margin: 2,
        	padding: 5,
        	width: 200
        },
        bulletpointdelete: {
        	backgroundColor: 'rgba(0, 0, 0, 0.1)',
        	padding: '12px 5px',
        	textAlign: 'center',
        	width: 150,

        	'&:hover': {
        		backgroundColor: 'rgba(0, 0, 0, 0.2)',
        		cursor: 'pointer'
        	}
        },
        footer: {
        	marginBottom: 50,
            width: 380,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#FFB800',
            fontWeight: 600,
            fontSize: 12,
            '& button': {
                width: 165,
                fontSize: 13,
                border: '1px solid transparent',
                background: theme.custom.common.pinkColor,
                color: theme.palette.primary.main,
                borderRadius: 60,

                '&:hover': {
                    background: 'none',
                    color: theme.custom.common.blackColor,
                    border: `1px solid ${theme.custom.common.pinkColor}`,
                },
            },
        },
        textError: {
            color: '#FF0000',
        }
	}
})

export default useStyles