import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
      paddingRight: 36,
    },
  };
});
export default useStyles;
