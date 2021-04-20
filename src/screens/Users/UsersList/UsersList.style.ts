import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            width: '100%',
            maxWidth: 1440,
            boxSizing: 'border-box',
            display: 'grid',
            margin: '33px auto 0',
            gap: '40px 12px',
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        paginationWrapper: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        item: {
            border: '1px solid #E5E5E5',
            borderRadius: 8,
            overflow: 'hidden',
        },
        itemIntro: {
            width: '100%',
            height: 0,
            paddingBottom: '50%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        itemAvatar: {
            marginTop: -30,
        },
        itemInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        brunoMars: {},
        itemTitle: {
            margin: '15px 0 0',
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: '-0.04em',
        },
        itemAdditionalInfo: {
            margin: '4px 0 32px',
            color: '#C4C4C4',
            '& a': {
                marginTop: 5,
                fontWeight: 600,
                color: '#8900FF',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
    }
})
export default useStyles
