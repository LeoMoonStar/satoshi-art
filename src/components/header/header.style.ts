import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    container: {
      width: '100%',
      boxSizing: 'border-box',
      alignItems: 'center ',
    },
    topNavs: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 200,
      padding: '18px 0',
      position: 'absolute',
      width: 300,
      zIndex: 1,
    },
    topNav: {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: '#C4C4C4',
      textTransform: 'initial',
      '&:hover': {
        transform: 'scale(1.03, 1.03)',
      },
    },
    topRow: {
      position: 'relative',
      height: 53,
      width: '100%',
      display: 'flex',
      alignItems: 'center ',
      borderBottom: '1px solid #ffffff50',
    },
    divider: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 1,
      backgroundColor: '#C4C4C4',
    },
    bottomRow: {
      display: 'flex',
      width: '100%',
      height: 51,
    },
    innerBottomRow: {
      width: '100%',
      marginTop: -55,
      alignItems: 'center ',
    },
    logo: {
      marginLeft: 20,
    },
    autocomplete: {
      position: 'relative',
      zIndex: 999,
      width: 672,

      '&[aria-expanded="true"] .MuiAutocomplete-inputRoot[class*="MuiInput-root"]': {
        borderRadius: '20px 20px 0 0',
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"]': {
        paddingLeft: 67,

        '&::placeholder': {
          color: theme.custom.common.grayColor,
          fontSize: 14,
          opacity: 1,
        },
      },
    },
    controls: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 13,
      marginLeft: 'calc(100vw - 460px)',
      marginTop: 33,
      position: 'absolute',
    },
    notificationBox: {
      backgroundColor: 'white',
      borderColor: '#C4C4C4',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: 40,

      '& div': {
        '&:hover': {
          cursor: 'pointer',
        },
        margin: '10px',
      },
    },

    createLink: {
      marginLeft: 10,
      textDecoration: 'none',
      '& button[class]:hover': {
        transform: 'scale(1.03, 1.03)',
        backgroundColor: '#5113D5',
      },
    },
    div: {
      borderColor: '#C4C4C4',
      borderStyle: 'solid',
      borderWidth: '1px 0 0 0',
      marginBottom: -42,
    },
    searchWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '20px 0',
      width: '100%',
    },
    searchInputContainer: {
      marginLeft: 100,
    },
    searchIcon: {
      transform: 'translate(0, -50%)',
      display: 'flex',

      '& svg': {
        width: 20,
        height: 20,
      },
      marginLeft: 10,
      marginTop: 25,
      position: 'absolute',
      zIndex: 1,
    },
    searchInputUnclick: {
      backgroundColor: 'white',
      borderWidth: 1,
      border: `solid ${theme.custom.common.grayColor}`,
      borderRadius: 60,
      height: 53,
      paddingRight: 8,
      '& .MuiAutocomplete-endAdornment': {
        display: 'none',
      },
      paddingLeft: 50,
      width: 672,
    },
    searchInputClicked: {
      backgroundColor: 'white',
      borderWidth: '1px 1px 0 1px',
      border: `solid ${theme.custom.common.grayColor}`,
      borderRadius: '24px 24px 0 0',
      height: 53,
      paddingRight: 8,
      '& .MuiAutocomplete-endAdornment': {
        display: 'none',
      },
      paddingLeft: 50,
      width: 672,
    },
    nftSearchBox: {
      backgroundColor: 'white',
      borderWidth: '0 1px 1px 1px',
      border: `solid ${theme.custom.common.grayColor}`,
      borderRadius: '0 0 60px 60px',
      height: 200,
      position: 'absolute',
      overflowY: 'scroll',
      width: 670,
      zIndex: 2,
    },
    searchResult: {
      color: 'rgba(127, 127, 127, 0.7)',
      marginLeft: 62,
      padding: 5,

      '&:hover': {
        color: 'rgba(127, 127, 127, 0.1)',
        cursor: 'pointer',
      },
    },
    connectLink: {
      marginRight: 24,
      textDecoration: 'none',
      '& button[class]:hover': {
        transform: 'scale(1.03, 1.03)',
        backgroundColor: '#ff0099',
      },
    },
    controlButtonsWrapper: {
      position: 'relative',
      minWidth: 94,
      height: 40,
      marginRight: 24,
      borderRadius: 60,
      backgroundColor: '#fff',
      border: '1px solid #C4C4C4',
      display: 'flex',
      justifyContent: 'center',
    },
    bottomNavs: {
      backgroundColor: 'white',
      border: '1px solid #C4C4C4',
      borderRadius: 60,
      display: 'flex',
      flexDirection: 'row',
      height: 52,
      justifyContent: 'space-between',
      marginRight: 150,
      width: 300,
    },
    bottomNav: {
      textDecoration: 'none',
      margin: '20px 12px',
      fontWeight: 'bold',
      color: '#C4C4C4',
      whiteSpace: 'nowrap',
      backgroundColor: '#fff',
      textTransform: 'initial',
      '&:hover': {
        backgroundColor: '#fff',
        transform: 'scale(1.03, 1.03)',
      },
    },
  };
});
export default useStyles;
