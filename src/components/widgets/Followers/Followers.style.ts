import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    container: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 20,
      minWidth: 1000,
      border: '1px solid #E5E5E5',
      padding: '32px 27px 40px 31px',

      '&:focus': {
        outline: 0,
      },
    },
    header: {
      display: 'flex',
      paddingLeft: 40,
    },
    styledTab: {
      minHeight: 0,
      textTransform: 'none',
      minWidth: 'max-content',
      padding: 0,
      marginRight: 26,
      color: theme.custom.common.blackColor,
      opacity: 1,
      fontWeight: 600,
      fontSize: 16,
      '&:hover': {
        color: theme.custom.common.pinkColor,
      },
    },
    selectedTab: {
      color: theme.custom.common.pinkColor,
    },
  };
});
export default useStyles;
