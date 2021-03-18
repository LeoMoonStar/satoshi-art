import { makeStyles } from '@material-ui/core/styles'
import headerBackground from 'shared/images/artist/headerBackground.jpg'

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        padding: '0 70px',
    },
    intro: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        height: 320,
        backgroundImage: `url(${headerBackground})`,
        backgroundSize: 'cover',
    },
    artistInfo: {
        position: 'relative',
    },
    artistAvatarGroup: {
        width: 140,
        height: 140,
        position: 'relative',
    },
    artistAvatar: {
        width: 140,
        height: 140,
        borderRadius: '50%',
    },
    artistStatus: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: '-12px',
        marginRight: '-12px',
    },
    artistInfoList: {
        fontWeight: 600,
    },
    name: {
        marginTop: -12,
        fontWeight: 800,
        fontSize: 70,
        lineHeight: '88px',
    },
    actionsList: {
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #C4C4C4',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        top: '100%',
        left: 0,
        position: 'absolute',
        backgroundColor: '#fff',
        '& button': {
            width: '100%',
        },
    },
    actions: {
        position: 'relative',
        marginLeft: 36,
        width: 82,
        height: 40,
    },
    artistInfoWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: -70,
        marginBottom: 20,
    },
    actionsButton: {
        width: 82,
        height: 40,
        border: '1px solid #C4C4C4',
        backgroundColor: '#fff',
        borderRadius: 60,
        '&:hover': {
            backgroundColor: '#fff',
            border: '1px solid #555',
        },
    },
    code: {
        marginBottom: 6,
    },
    helpText: {
        marginBottom: 6,
        color: '#7E7E7E',
    },
    linkToWebPage: {
        color: '#FF00E5',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    artistStatistic: {
        marginBottom: 35,
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    artistStatisticItem: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 34,
        color: '#fff',
        '& svg': {
            marginRight: 8,
            '& path': {
                fill: '#fff !important',
                stroke: 'transparent !important',
            },
        },
    },
    nftBackgroundImage: {
        position: 'absolute',
        top: 23,
        right: 0,
    },
    followButton: {
        minWidth: 157,
        marginLeft: 35,
        lineHeight: '40px',
        padding: 0,
        color: '#fff',
        borderRadius: 60,
        backgroundColor: '#ff0099',
        textTransform: 'initial',
        '&:hover': {
            backgroundColor: '#ff009990',
        },
    },
}))

export default useStyles