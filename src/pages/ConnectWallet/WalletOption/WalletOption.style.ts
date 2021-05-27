import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    connectBtn: {
      width: 280,
      height: 54,
      backgroundColor: theme.palette.primary.main,
      color: 'black',
      border: `1px solid ${theme.custom.common.grayColor}`,
      borderRadius: 40,
    },
    iconWrapper: {
      marginRight: 10,
    },
    externalLink: {
      textDecoration: 'none',
    },
  };
});

export default useStyles;
