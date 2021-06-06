import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    '@keyframes loader': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
    loader: {
      width: '100%',
      margin: '16px 0',
      textAlign: 'center',
      '& svg': {
        animation: '$loader 2s linear infinite',
      },
    },
  };
});
export default useStyles;
