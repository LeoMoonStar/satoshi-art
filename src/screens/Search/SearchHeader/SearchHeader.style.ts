import { makeStyles } from '@material-ui/core/styles'
import { indigo } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => {
    return {
        searchWrapper: {
            backgroundColor: theme.palette.primary.main,
            position: 'relative',
            margin: '-27px 0 60px 136px',
            width: 674,
        },
        searchIcon: {
            position: 'absolute',
            justifyContent: 'space-between',
            transform: 'translate(0, -50%)',
            top: '50%',
            left: 21,
            display: 'flex',
            width: 190,

            '& svg': {
                width: 20,
                height: 20,
            },
        },
        divider: {
            backgroundColor: theme.custom.common.grayColor,
        },
        searchInput: {
            height: 53,
            width: '100%',
            border: `1px solid ${theme.custom.common.grayColor}`,
            borderRadius: 60,
            marginRight: 12,
            paddingLeft: 15,

            '& input': {
                paddingLeft: 67,
                '&::placeholder': {
                    color: theme.custom.common.grayColor,
                    fontSize: 14,
                    opacity: 1,
                },
            },
        },
        resultsCount: {
            fontSize: 20,
            color: theme.custom.common.darkerGrayColor,
            marginRight: 13,
        },
        filters: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 70px 40px 70px',
        },
        selectedTagsList: {
            display: 'flex',
            alignItems: 'center',
        },
        tags: {
            display: 'flex',
            color: theme.custom.common.blackColor,
            fontSize: 30,
        },
        chosenTag: {
            display: 'flex',
            alignItems: 'center',
            fontWeight: 800,
            textTransform: 'lowercase',

            '& hr': {
                marginRight: 12,
                backgroundColor: theme.custom.common.darkerGrayColor,
            },
        },
        crossBtn: {
            fontWeight: 300,
            margin: '0 12px 0 12px',
            border: 'none',
            backgroundColor: theme.palette.primary.main,
            fontSize: 20,
            cursor: 'pointer',

            '&:focus': {
                outline: 'none',
            },
        },
        clearBtn: {
            color: '#3E85F0',
            cursor: 'pointer',
            textTransform: 'capitalize',
            background: 'none',
            border: 'none',
            fontSize: 20,

            '&:focus': {
                outline: 'none',
            },
        },
        suggestedTags: {
            margin: '25px 0 25px 67px',
            fontWeight: 600,
        },
        tag: {
            backgroundColor: theme.custom.common.blackColor,
            borderRadius: 60,
            color: theme.palette.primary.main,
            marginRight: 12,
            height: 40,
        },
        select: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 142,
            height: 40,
            borderRadius: 60,
            marginLeft: 16,
            border: `1px solid ${theme.custom.common.grayColor}`,

            '&:focus': {
                borderRadius: 60,
                backgroundColor: theme.palette.primary.main,
            },
        },
        paper: {
            borderRadius: 12,
            marginTop: 8,
        },
        list: {
            paddingTop: 0,
            paddingBottom: 0,
            background: 'white',
            '& li': {
                fontWeight: 200,
                paddingTop: 12,
                paddingBottom: 12,
            },
            '& li:hover': {
                color: theme.palette.primary.main,
                background: theme.custom.common.purpleColor,
            },
            '& li.Mui-selected': {
                color: theme.palette.primary.main,
                background: theme.custom.common.purpleColor,
            },
            '& li.Mui-selected:hover': {
                color: theme.palette.primary.main,
                background: theme.custom.common.purpleColor,
            },
        },
    }
})

export default useStyles
