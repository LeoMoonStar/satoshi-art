import { makeStyles } from '@material-ui/core/styles'
import connectWalletBackground from 'shared/images/connectWalletBackground.png'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            height: 830,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `url(${connectWalletBackground})`,
            backgroundSize: 'cover',
        },
        walletsModal: {
            height: 490,
            width: 765,
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 30,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: 'calc(50% - 245px)',
            left: 'calc(50% - 360px)',
        },
        modalHeader: {
            height: 130,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 60,
            paddingRight: 60,
        },
        content: {
            height: 'calc(100% - 130px)',
            display: 'flex',
            paddingLeft: 60,
            paddingRight: 60,
        },
        info: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        backBtn: {
            textDecoration: 'none',
            display: 'inline-flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'black',
            marginBottom: 40,
        },
        backBtnText: {
            fontSize: 30,
            fontWeight: 900,
        },
        divider: {
            backgroundColor: theme.custom.common.purpleColor,
            marginTop: 20,
            marginBottom: 20,
        },
        description: {
            marginBottom: 80,
            color: theme.custom.common.grayColor,
        },
        walletInfo: {
            color: theme.custom.common.pinkColor,
        },
        privateRules: {
            color: theme.custom.common.grayColor,
            fontSize: 12,
        },
        connectors: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 60,
        },
        termsModal: {
            width: 318,
            height: 400,
            padding: '27px 64px 32px 63px',
            background: '#FFFFFF',
            borderRadius: 20,
            border: `1px solid ${theme.custom.common.grayColor}`,
            textAlign: 'center',
        },
        termsModalTitle: {
            color: theme.custom.common.blackColor,
            fontWeight: 800,
            fontSize: 30,
            paddingBottom: 21,
            borderBottom: '1px solid #6A2FE74D',
            lineHeight: '38px',
        },
        termsModalDscr: {
            fontSize: 16,
            margin: '20px 0 24px 0',
            lineHeight: '22px',
            color: '#7E7E7E',
            fontWeight: 400,

            '& a': {
                fontWeight: 600,
                color: 'inherit',
                textDecoration: 'none',
            },
        },
        termsModalForm: {
            '& label': {
                fontSize: 14,
                color: '#7E7E7E',
                marginRight: 0,
                marginTop: 12,
                '&:first-child': {
                    marginTop: 0,
                },
                '& .MuiCheckbox-root': {
                    width: 16,
                    height: 16,
                    padding: 1,
                },
                '& .MuiTypography-root': {
                    fontSize: 'inherit',
                    marginLeft: 11,
                },
            },
        },
        termsModalBtn: {
            width: 189,
            height: 40,
            fontSize: 13,
            fontWeight: 600,
            marginTop: 24,
            lineHeight: '16px',
            backgroundColor: theme.custom.common.pinkColor,
            color: theme.palette.primary.main,
            textTransform: 'none',
            borderRadius: 60,
        },
    }
})
export default useStyles
