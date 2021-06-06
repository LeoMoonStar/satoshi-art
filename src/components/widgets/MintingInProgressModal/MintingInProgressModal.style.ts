import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: 370,
      padding: 30,
      borderRadius: 20,
      backgroundColor: '#fff',
    },
    title: {
      color: '#000',
      fontWeight: 800,
      fontSize: 21,
      paddingBottom: 21,
      borderBottom: '1px solid #6A2FE74D',
      lineHeight: '38px',
      textAlign: 'center',
    },
    content: {
      textAlign: 'center',
      fontSize: 14,
      margin: '20px 0 24px 0',
      lineHeight: '22px',
      color: '#7E7E7E',
      fontWeight: 400,
      '& a': {
        wordBreak: 'break-all',
        color: '#ff0099',
        textDecoration: 'none',
      },
    },
    actionButton: {
      display: 'block',
      margin: '0 auto',
    },
  };
});
export default useStyles;
