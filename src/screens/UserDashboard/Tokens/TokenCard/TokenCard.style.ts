import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        card: {
            marginTop: 86,
            width: '207px !important',
            border: '1px solid #E5E5E5',
            boxSizing: 'border-box',
            padding: '0 17px 24px',
            borderRadius: 10,
            margin: '0 8px',
            pointerEvents: 'none',
            touchEvents: 'none',
            '& > div': {
                pointerEvents: 'initial',
                touchEvents: 'initial',
            },
        },
        tokenName: {
            margin: '16px 0 12px',
            fontSize: 20,
            fontWeight: 600,
            color: '#000',
        },
        userInfo: {
            marginBottom: 20,
            fontSize: 9,
            color: '#7E7E7E',
            '& a': {
                fontWeight: 600,
                color: '#8900FF',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'none',
                },
            },
        },
        avatar: {
            marginTop: -54,
        },
        topWrapper: {
            padding: '0 5px',
        },
        tokenPreviewWrapper: {
            marginTop: -56,
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '100%',
        },
        tokenPreview: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 20,
        },

        controls: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        controlButton: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 0,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
                '& div': {
                    transform: 'scale(1.1,1.1)',
                },
            },
            '& div': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 27,
                height: 27,
                borderRadius: '50%',
                transition: 'transform 0.25s',
            },
            '& span': {
                whiteSpace: 'nowrap',
                fontSize: 10,
                color: '#7E7E7E',
            },
        },
        viewButton: {
            '& div': {
                backgroundColor: '#FF009915',
                '& svg': {
                    width: 16,
                    '& path': {
                        fill: '#FF0099 !important',
                    },
                },
            },
        },
        editButton: {
            '& div': {
                backgroundColor: '#00C2FF15',
                '& svg': {
                    width: 13,
                    stroke: '#00C2FF',
                },
            },
        },
        cancelBid: {
            '& div': {
                backgroundColor: '#FFB80015',
                '& svg': {
                    width: 13,
                    stroke: '#FFB800',
                },
            },
        },
    }
})

export default useStyles
