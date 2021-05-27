import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 31,
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 129,
      border: '1px solid #E5E5E5',
      borderRadius: 10,
    },
    cardIcon: {},
    info: {
      marginLeft: 20,
    },
    amount: {
      fontWeight: 700,
      fontSize: 34,
      lineHeight: '43px',
    },
    title: {
      margin: '0 0 6px',
      fontWeight: 400,
      fontSize: 12,
    },
    helpText: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 9,
      fontWeight: 400,
      color: '#C4C4C4',
      '& svg': {
        marginRight: 5,
      },
    },
  };
});

export default useStyles;
