import { makeStyles } from '@material-ui/core/styles';
import arrowOfListImage from 'components/images/dropOfTheDay/listArrow.svg';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      margin: '80px 0',
      boxSizing: 'border-box',
      padding: '0 123px',
      display: 'flex',
      justifyContent: 'space-around',
    },
    card: {
      maxWidth: '25%',
      padding: '0 16px',
      '& img': {
        width: '18vw',
        height: '22vw',
        borderRadius: 20,
      },
    },
    header: {
      marginTop: 30,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
    },
    title: {
      letterSpacing: '-0.04em',
      margin: 0,
      fontWeight: 600,
      fontSize: 30,
      lineHeight: '30px',
    },
    count: {
      fontWeight: 600,
      fontSize: 16,
      letterSpacing: '-0.04em',
      color: '#7E7E7E',
    },
    subTitle: {
      width: '100%',
      marginTop: '10px',
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: '-0.04em',
      color: '#4D0ED2',
    },
    list: {
      listStyleImage: `url(${arrowOfListImage})`,
      color: '#7E7E7E',
      margin: 0,
      paddingLeft: 26,
      '& li': {
        marginBottom: '1em',
      },
    },
    buyNow: {
      margin: '24px auto 0',
      display: 'block',
    },
    content: {
      fontWeight: 400,
      fontSize: 16,
      color: '#7E7E7E',
      '& ul': {
        margin: '20px 0',
        paddingLeft: 25,
        listStyleImage: `url(${arrowOfListImage})`,
        '& li': {
          marginBottom: '.4em',
        },
      },
    },

  };
});
export default useStyles;
