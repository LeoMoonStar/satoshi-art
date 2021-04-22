import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
    return {
        divider: {
            backgroundColor: theme.custom.common.grayColor,
        },
        resultsCount: {
            fontSize: 20,
            lineHeight: '20px',
            color: theme.custom.common.darkerGrayColor,
            marginRight: 13,
        },
        filters: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 0 40px',
            boxSizing: 'border-box',
            padding: '0 70px',
        },
        selectedTagsList: {
            display: 'flex',
            alignItems: 'flex-end',
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
            lineHeight: '18px',
            textTransform: 'lowercase',

            '& hr': {
                marginRight: 12,
                backgroundColor: theme.custom.common.darkerGrayColor,
            },
        },
        crossBtn: {
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            fontWeight: 300,
            margin: '0 12px 0 12px',
            border: 'none',
            backgroundColor: theme.palette.primary.main,
            fontSize: 20,
            cursor: 'pointer',
            '& svg': {
                width: 20,
            },
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
            lineHeight: '20px',
            paddingTop: 0,
            paddingBottom: 0,

            '&:focus': {
                outline: 'none',
            },
        },
        suggestedTags: {
            margin: '25px 0 25px',
            boxSizing: 'border-box',
            padding: '0 50px',
            fontWeight: 600,
        },
        tag: {
            backgroundColor: theme.custom.common.blackColor,
            borderRadius: 60,
            color: theme.palette.primary.main,
            display: 'flex !important',
            alignContent: 'center',
            height: 40,
        },
        select: {
            minWidth: 166,
            height: 40,
            marginLeft: 16,
            fontWeight: 600,
            color: theme.custom.common.darkerGrayColor,
            fontSize: 13,
            letterSpacing: '-0.04em',
            '& .MuiSelect-select.MuiSelect-select': {
                padding: '0 !important',
            },
        },
        tagsSlider: {
            width: '100%',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundImage: 'linear-gradient(left,#ffffff20 0%, #fff 60%)',
                width: 60,
                height: 60,
            },
            '& .slick-slide': {
                marginRight: 12,
            },
            '& .slick-prev:before, & .slick-next:before': {
                color: '#000',
            },
            '& .slick-track': {
                display: 'flex',
                alignItems: 'center',
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
