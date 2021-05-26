import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
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
      '& .slick-slide div:focus': {
        outline: 0,
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
        '&:before': {
          display: 'none',
        },
      },
    },
    slide: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
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
      marginLeft: 'auto',
    },
    actionButton: {
      width: 28,
      height: 28,
      padding: 2,
      '&:not(:first-child)': {
        marginLeft: 5,
      },
      '& svg path': {
        fill: '#c4c4c4 !important',
        stroke: 'transparent !important',
      },
    },
    workInfo: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      fontSize: 13,
      fontWeight: 600,
      marginTop: 6,
      whiteSpace: 'nowrap',
    },
    cardContent: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    bidButton: {
      width: 'initial',
      margin: '0 -6px -9px auto',
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
      marginLeft: 5,
      background: '#fff',
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    seeAll: {
      marginTop: 20,
    },
  };
});
export default useStyles;
