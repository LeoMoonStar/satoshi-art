import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px 0 20px 40px',
      borderBottom: `1px solid #6A2FE74D`,

      '&:first-of-type': {
        borderTop: `1px solid #6A2FE74D`,
      },
    },
  };
});
export default useStyles;
