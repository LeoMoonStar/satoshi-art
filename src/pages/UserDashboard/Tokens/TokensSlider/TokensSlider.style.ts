import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '16px 0',
    },
    mainTitle: {
      width: '100%',
      margin: 0,
      fontSize: 24,
      fontWeight: 600,
    },
    sliderRow: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
    head: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    slider: {
      marginTop: -30,
      width: '100%',
      '& .slick-arrow': {
        position: 'absolute',
        top: -5,
        right: 0,
        left: 'initial',
        width: 36,
        height: 36,
        zIndex: 2,
        border: '1px solid #E5E5E5',
        borderRadius: '50%',
        '&:before': {
          display: 'none',
        },
        '&:hover': {
          backgroundColor: '#7E7E7E',
          '& svg path': {
            fill: '#fff',
            stroke: '#fff',
          },
        },
      },
      '& .slick-prev': {
        right: 44,
      },
      '& .slick-next': {
        transform: 'rotateZ(180deg) translate(0, 50%)',
      },
      '& .slick-track': {
        display: 'flex',
        alignContent: 'stretch',
      },
    },
    sliderHasNotMore: {
      '& .slick-list > div': {
        marginLeft: 0,
      },
    },
    viewAllButton: {
      position: 'relative',
      zIndex: 2,
      marginRight: 96,
      minWidth: 97,
    },
  };
});

export default useStyles;
