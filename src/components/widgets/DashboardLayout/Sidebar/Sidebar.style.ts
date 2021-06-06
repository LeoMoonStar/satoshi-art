import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      boxSizing: 'border-box',
      padding: '0 36px',
    },
    brand: {
      display: 'flex',
      margin: '67px 0 70px 5px',
    },
    nav: {},
    navItem: {
      position: 'relative',
      width: '100%',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 4,
      borderRadius: 5,
      textDecoration: 'none',
      backgroundColor: 'transparent',
      border: 0,
      padding: 0,
      color: '#000',
      cursor: 'pointer',
      '& svg': {
        width: 20,
        marginLeft: 14,
        marginRight: 16,
      },
      '&:hover': {
        fontWeight: 600,
      },
    },
    navItemActive: {
      backgroundColor: '#4D0ED215',
      fontWeight: 600,
      color: '#4D0ED2',
      '&::after': {
        position: 'absolute',
        top: 0,
        left: -36,
        content: '""',
        width: 6,
        height: '100%',
        backgroundColor: '#4D0ED2',
        borderTopRightRadius: 43,
        borderBottomRightRadius: 43,
      },
      '& svg path': {
        stroke: '#4D0ED2',
      },
    },
    navItemSelected: {},
  };
});
export default useStyles;
