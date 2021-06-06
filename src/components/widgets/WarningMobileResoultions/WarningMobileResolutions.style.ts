import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    width: 351,
    padding: '20px 50px 32px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    textAlign: 'center',
    border: 0,
    outline: 0,
    borderRadius: 20,
  },
  title: {
    fontWeight: 900,
    fontSize: 20,
    marginTop: 12,

    marginBottom: 20,
    paddingBottom: 16,
    color: '#000',
    textAlign: 'center',
    borderBottom: '1px solid #6A2FE730',
  },
  content: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: '19px',
    color: '#7e7e7e',
  },
  buttonFilled: {
    minWidth: 150,
    fontSize: 13,
  },
}));

export default useStyles;
