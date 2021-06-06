import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    container: {
      display: 'flex',
      marginRight: 40,
    },
    bio: {
      marginLeft: 17,
    },
    name: {
      display: 'flex',
      alignItems: 'center',
      color: theme.custom.common.purpleColor,
      fontWeight: 600,
      fontSize: 20,
    },
    actionBtn: {
      width: 68,
      height: 17,
      border: `1px solid ${theme.custom.common.purpleColor}`,
      background: theme.palette.primary.main,
      color: theme.custom.common.purpleColor,
      borderRadius: 100,
      marginLeft: 8,
      fontSize: 9,
      fontWeight: 600,
      textTransform: 'none',
    },
    info: {
      color: theme.custom.common.darkerGrayColor,
      fontSize: 11,
      marginBottom: 20,
    },
    socialBtns: {
      display: 'flex',
    },
    socialBtn: {
      display: 'flex',
      alignItems: 'center',
      color: theme.custom.common.darkerGrayColor,
      textDecoration: 'none',
      '& span': {
        marginLeft: 5,
      },
      '&:first-of-type': {
        marginRight: 20,
      },
    },
  };
});
export default useStyles;
