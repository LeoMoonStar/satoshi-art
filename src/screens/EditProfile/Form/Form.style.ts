import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        form: {
            display: 'flex',
        },
        subtitle: {
            fontWeight: 600,
            fontSize: 18,
            lineHeight: '23px',
            marginBottom: 24,
        },
        bio: {
            maxWidth: 568,
            flex: 1,
        },
        avatarUpdate: {
            width: 250,
            marginLeft: 132,
        },
        tooltip: {
            color: '#7E7E7E',
            fontSize: 12,
            '& a': {
                color: '#FF0099',
                fontWeight: 700,
                textDecoration: 'none',
            },
        },
        upload: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            '& label': {
                marginTop: 'auto',
                marginBottom: 32,
            },
        },
        avatar: {
            height: 118,
            width: 118,
            borderRadius: '50%',
            marginBottom: 16,
            '& > div': {
                width: 118,
                height: 118,
                borderRadius: '50%',
            },
        },
        btn: {
            width: 136,
            height: 40,
            color: '#ffffff',
            background: '#000000',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '-0.04em',
            borderRadius: 60,
            marginTop: 24,
            '&:hover': {
                color: '#ffffff',
                background: '#000000',
            },
        },
        submit: {
            width: 430,
            height: 40,
            borderRadius: 60,
            background: '#FF0099',
            color: '#ffffff',
        },
        input: {
            marginBottom: 32,
            '& b + input': {
                marginLeft: 5,
            },
        },
        linkBtn: {
            textTransform: 'none',
            '& span': {
                fontSize: 16,
                color: '#FF0099',
            },
        },
        verification: {
            marginBottom: 60,
        },
        verificationContent: {
            display: 'flex',
            justifyContent: 'space-between',
            '& p': {
                width: 359,
                color: '#7E7E7E',
                fontSize: 16,
                lineHeight: '22px',
            },
        },
    }
})
export default useStyles
