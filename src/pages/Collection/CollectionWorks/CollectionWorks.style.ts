import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 104,
    padding: '0 70px',
  },
  navigationRow: {
    width: '100%',
    margin: '60px 0 30px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: "20%"
  },
  navigation: {
    marginLeft: 'auto',
    '& button': {
      fontWeight: 600,
      textTransform: 'initial',
      '&[disabled]': {
        color: '#7E7E7E',
      },
    },
  },
  selectedCategory: {
    fontSize: 30,
    fontWeight: 800,
    '& span': {
      fontSize: 20,
      fontWeight: 400,
      color: '#7E7E7E',
    },
  },
  filterButton: {
    marginRight: -12,
  },
}));

export default useStyles;
