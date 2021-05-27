import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    searchWrapper: {
      backgroundColor: theme.palette.primary.main,
      position: 'relative',
      display: 'block',
      width: 674,
    },
    searchIcon: {
      position: 'absolute',
      justifyContent: 'space-between',
      transform: 'translate(0, -50%)',
      top: '50%',
      left: 21,
      display: 'flex',
      width: 190,
      cursor: 'pointer',

      '& svg': {
        width: 20,
        height: 20,
      },
    },
    searchInput: {
      height: 53,
      width: '100%',
      border: `1px solid ${theme.custom.common.grayColor}`,
      borderRadius: 60,
      marginRight: 12,
      padding: '0 15px',

      '& input': {
        paddingLeft: 52,
        '&::placeholder': {
          color: theme.custom.common.grayColor,
          fontSize: 14,
          opacity: 1,
        },
      },
    },
  };
});

export default useStyles;
