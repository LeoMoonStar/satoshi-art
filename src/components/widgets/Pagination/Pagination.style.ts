import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      display: 'flex',
      padding: 0,
      marginTop: 30,
      listStyle: 'none',
      border: '1px solid #E5E5E5',
      borderRadius: 9,
      overflow: 'hidden',
      '& button': {
        width: 38,
        height: 46,
        border: 0,
        cursor: 'pointer',
        color: '#464255',
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: '#46425515',
        },
      },
    },
    first: {
      '& button': {
        minWidth: 46,
      },
    },
    last: {
      '& button': {
        minWidth: 46,
        '& svg': {
          transform: 'rotateZ(180deg)',
        },
      },
    },
    active: {
      '& button': {
        backgroundColor: '#46425515',
      },
    },
  };
});

export default useStyles;
