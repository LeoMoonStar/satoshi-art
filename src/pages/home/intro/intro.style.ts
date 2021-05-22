import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    container: {
      position: 'relative',
      zIndex: 1,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      padding: `12px 76px 16px`,
      background: theme.palette.primary.main,
      overflow: 'hidden',
    },
    explore: {
      position: 'relative',
      width: '100%',
      display: 'flex',
    },
    exploreBlock: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    exploreButton: {
      minWidth: 204,
      height: 53,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 40,
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'initial',
      border: `1px solid ${theme.custom.common.grayColor}`,
      transition: 'transform 0.25s',
      '&:hover': {
        transform: 'scale(1.05,1.05)',
      },
    },
    exploreLink: {
      textDecoration: 'none',
    },
    exploreBlockSecond: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& img': {
        zIndex: 1,
      },
    },
    exploreShadow: {
      position: 'absolute',
      top: -190,
      right: 0,
    },
    introText: {
      position: 'relative',
      fontSize: 35,
      fontWeight: 800,
      lineHeight: '44px',
    },
    firstPartOfIntroText: {
      position: 'absolute',
      top: 76,
      left: 0,
      transform: 'rotateZ(-90deg)',
      transformOrigin: 'left bottom',
    },
    secondPartOfIntroText: {
      width: 258,
      marginLeft: 105,
      marginBottom: 28,
    },
  };
});
export default useStyles;
