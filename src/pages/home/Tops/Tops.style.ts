import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    section: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      boxSizing: 'border-box',
      padding: '0 130px',
    },
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
    },
    col: {
      width: 390,
      display: 'flex',
      flexWrap: 'wrap',
      '&:not(:first-child)': {
        marginLeft: 3,
      },
    },
    subTitle: {
      color: '#7E7E7E',
      marginLeft: 55,
      fontWeight: 600,
    },
    title: {
      width: '100%',
      fontSize: 30,
      margin: 0,
      boxSizing: 'border-box',
      padding: '5px 0 20px 55px',
    },
    prevImage: {},
    users: {
      width: '100%',
      marginTop: 27,
      marginLeft: 55,
    },
    user: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 18,
      textDecoration: 'none',
      color: '#000',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    info: {
      marginLeft: 13,
    },
    userName: {
      fontWeight: 600,
    },
    price: {
      fontSize: 11,
    },
    seeAllLink: {
      marginTop: 41,
      marginLeft: 55,
      textDecoration: 'none',
      '& button': {
        backgroundColor: '#000',
        minWidth: 157,
        height: '53px',
        borderRadius: 60,
        fontWeight: 600,
        color: '#fff',
        textTransform: 'initial',
        transition: 'opacity 0.25s',
        '&:hover': {
          backgroundColor: '#00000090',
        },
      },
    },
  };
});
export default useStyles;
