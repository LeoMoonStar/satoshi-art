import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '0 136px',
        },
        mainTitle: {
            width: '100%',
            margin: '16px 0 21px',
            fontSize: 30,
            fontWeight: 800,
        },
        innerContainer: {
            position: 'relative',
            width: '100%',
        },
        card: {
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            height: 341,
            backgroundColor: '#7E7E7E',
            borderRadius: 20,
        },
        leftCol: {
            marginLeft: 110,
            display: 'flex',
            '& h3': {
                position: 'absolute',
                left: 50,
                zIndex: 0,
                width: 185,
                fontSize: 80,
                fontWeight: 800,
                color: '#fff',
            },
            '& img': {
                position: 'relative',
                zIndex: 1,
            },
        },
        rightCol: {
            position: 'relative',
            zIndex: 1,
            marginLeft: -70,
            padding: '0 50px',
            boxSizing: 'border-box',
            width: 'calc(100% - 510px)',
        },
        slider: {
            width: 573,
            boxSizing: 'border-box',
            marginLeft: 'auto',
            marginBottom: 60,

            '& .slick-dots': {
                bottom: -40,
                '& li': {
                    margin: 0,
                },
                '& button': {
                    width: 12,
                    height: 12,
                    borderRadius: '100%',
                    backgroundColor: '#C4C4C4',

                    '&::before': {
                        display: 'none',
                    },

                    '&:hover': {
                        opacity: '0.8',
                    },
                },

                '& .slick-active button': {
                    backgroundColor: '#FFB800',
                },
            },

            '& .slick-prev': {
                marginLeft: -44,
                transform: 'rotateZ(180deg) translate(0, 50%)',
            },
            '& .slick-next': {
                marginRight: -44,
            },
            '& .slick-arrow': {
                width: 55,
                height: 55,
                '&:hover': {
                    stroke: '#FFB800',
                },
            },
        },
        slide: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 5,
        },
        header: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
            '& h3': {
                margin: 0,
                fontWeight: 600,
                fontSize: 24,
            },
        },
        actionButtons: {
            minWidth: 42,
            marginRight: -12,
            display: 'flex',
            gap: 5,
            marginLeft: 'auto',
        },
        actionButton: {
            width: 28,
            height: 28,
            padding: 2,
            '& svg path': {
                fill: '#c4c4c4 !important',
                stroke: 'transparent !important',
            },
        },
        workInfo: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: 13,
            fontWeight: 600,
            marginTop: 6,
        },
        cardContent: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        bidButton: {
            margin: '0 -6px -6px auto',
            fontSize: 13,
            fontWeight: 600,
            color: '#FF0099',
            textTransform: 'initial',
            '&:hover': {
                opacity: '.8',
            },
        },
        count: {
            position: 'relative',
            zIndex: 1,
            marginLeft: '1ch',
            color: '#7E7E7E',
        },
        authorInfo: {
            width: '100%',
            fontSize: 9,
            fontWeight: 400,
            color: '#C4C4C4',
            '& a': {
                fontWeight: 600,
                color: '#FF0099',
                '&:hover': {
                    textDecoration: 'none',
                },
            },
        },
        slideImage: {
            width: 262,
            height: 245,
            objectFit: 'cover',
            borderRadius: 20,
        },
        info: {
            width: 292,
            height: 245,
            padding: '23px 25px 17px 25px',
            boxSizing: 'border-box',
            background: '#fff',
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        colorsDissolving: {
            position: 'absolute',
            top: '-30%',
            right: 0,
            zIndex: 0,
        },
        // todo: we should create one button component and reuse it everywhere with different variants
        seeAll: {
            minWidth: 157,
            lineHeight: '40px',
            marginTop: 20,
            padding: 0,
            color: '#fff',
            borderRadius: 60,
            backgroundColor: '#ff0099',
            textTransform: 'initial',
            '&:hover': {
                backgroundColor: '#ff009990',
            },
        },
    }
})
export default useStyles
