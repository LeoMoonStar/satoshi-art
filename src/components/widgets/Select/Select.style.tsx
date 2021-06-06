import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    select: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      borderRadius: 60,
      paddingRight: '0 !important',
      border: `1px solid ${theme.custom.common.grayColor}`,

      '&:focus': {
        borderRadius: 60,
        backgroundColor: theme.palette.primary.main,
      },
    },
    iconSelect: {
      display: 'none',
    },
    paper: {
      borderRadius: 12,
      marginTop: 8,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      background: 'white',
      '& li': {
        fontWeight: 200,
        paddingTop: 12,
        paddingBottom: 12,
      },
      '& li:hover': {
        color: theme.palette.primary.main,
        background: theme.custom.common.purpleColor,
      },
      '& li.Mui-selected': {
        color: theme.palette.primary.main,
        background: theme.custom.common.purpleColor,
      },
      '& li.Mui-selected:hover': {
        color: theme.palette.primary.main,
        background: theme.custom.common.purpleColor,
      },
    },
  };
});
export default useStyles;
