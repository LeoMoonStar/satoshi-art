import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      marginRight: 15,
      fontSize: 13,
      textTransform: 'none',
      padding: 0,
      fontWeight: 400,
    },
  };
});
export default useStyles;
