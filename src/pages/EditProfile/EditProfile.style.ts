import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '60px 136px 100px',
    },
    title: {
      display: 'inline-block',
      margin: '18px 0 20px',
      paddingBottom: 16,
      fontSize: 30,
      lineHeight: '37px',
      fontWeight: 800,
      borderBottom: '1px solid #6A2FE730',
      letterSpacing: '-0.04em',
    },
    contentCard: {
      width: 292,
      marginTop: 33,
    },
    goBack: {
      display: 'block',
      marginRight: 'auto',
      fontSize: 20,
      fontWeight: 600,
      textTransform: 'initial',
      '& svg': {
        marginRight: 7,
      },
    },
  };
});
export default useStyles;
