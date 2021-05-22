import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    topFooter: {
      height: 240,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 74,
      marginRight: 74,
    },
    bottomFooter: {
      height: 240,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 74,
      marginRight: 74,
    },
    leftBottomCol: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    rightBottomCol: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    socialLinks: {
      display: 'flex',
      marginBottom: 38,
      '& > a': {
        '&:not(:first-child)': {
          marginLeft: 13,
        },
        textDecoration: 'none',
        '&:hover': {
          opacity: 0.9,
        },
      },
    },
    copyright: {
      color: '#fff',
    },
    footerSplitter: {
      height: 1,
      background: 'white',
    },
    emailInput: {
      height: 46,
      width: 400,
      fontSize: 13,
      marginRight: 4,
      border: `1px solid ${theme.custom.common.grayColor}`,
      borderRadius: 40,
      paddingLeft: 15,
      color: theme.palette.primary.main,
    },
    subscribeBtn: {
      width: 157,
      height: 46,
      backgroundColor: theme.palette.primary.main,
      color: 'black',
      borderRadius: 40,
      textTransform: 'initial',
      '&:hover': {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.custom.common.grayColor}`,
      },
    },
    subscribeToOurNewsLetter: {
      marginRight: 16,
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },
    footerMenu: {
      marginTop: 33,
    },
  };
});
export default useStyles;
