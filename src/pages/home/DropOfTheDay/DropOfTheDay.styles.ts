import { makeStyles } from '@material-ui/core/styles';

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
     
      borderRadius: 20,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    leftCol: {
      marginLeft: 110,
      display: 'flex',
      '& h3': {
        position: 'absolute',
        left: 50,
        zIndex: 9999,
        width: 185,
        fontSize: 50,
        fontWeight: 800,
        color: '#fff',
        top:100
      },
      '& img': {
        position: 'relative',
        zIndex: 1,
      },
    },
    rightCol: {
      position: 'relative',
      zIndex: 1,
      // marginLeft: "2%",
      // marginLeft: -70,
      padding: '0 50px',
      boxSizing: 'border-box',
      width: '60%',
      '& .slick-arrow:hover': {
        '& circle': {
          fill: '#fff',
        },
        '& path': {
          fill: '#7E7E7E',
        },
      },
    },
    colorsDissolving: {
      position: 'absolute',
      top: '-30%',
      right: 0,
      zIndex: 0,
    },
  };
});
export default useStyles;
