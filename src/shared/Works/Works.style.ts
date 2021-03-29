import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10,
    },
    work: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 46,
    },
    preview: {
        width: '100%',
    },
    authorInfo: {
        width: '100%',
        fontSize: 9,
        fontWeight: 400,
        color: '#C4C4C4',
        '& a': {
            fontWeight: 600,
            color: '#8900FF',
            '&:hover': {
                textDecoration: 'none',
            },
        },
    },
    workInfo: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        fontSize: 13,
        fontWeight: 600,
        marginTop: 29,
    },
    info: {
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #E5E5E5',
        boxSizing: 'border-box',
        padding: '0 21px 21px 21px',
        borderTop: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    authorAvatar: {
        display: 'flex',
        marginTop: -30,
        marginBottom: 14,
    },
    infoHead: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    actionButtons: {
        minWidth: 88,
        marginRight: -12,
        marginLeft: 'auto',
    },
    actionButton: {
        width: 44,
        padding: 11,
        '& svg path': {
            fill: '#c4c4c4 !important',
            stroke: 'transparent !important',
        },
    },
    name: {
        margin: 0,
    },
    bidButton: {
        margin: '0 -6px -9px auto',
        fontSize: 13,
        fontWeight: 600,
        color: '#FF0099',
        textTransform: 'initial',
        background: '-webkit-linear-gradient(left, #6A2FE7, #FF0099)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        '&:hover': {
            opacity: '.8',
        },
    },
    count: {
        marginLeft: '1ch',
        color: '#7E7E7E',
    },
    seeAllButton: {
        margin: '0 auto',
        display: 'block',
        height: 53,
        fontWeight: 600,
    },
}))

export default useStyles
