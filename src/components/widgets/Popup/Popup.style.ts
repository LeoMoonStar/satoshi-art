import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
    width: '100%'
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: '0 auto',
    padding: '50px 0',
    width: 500
  },
  close: {
    fontSize: 20,
    marginLeft: 480,
    marginTop: -50,
    width: 12,

    '&:hover': {
      cursor: 'pointer'
    }
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: '0 50px',
    textAlign: 'center'
  },
  divider: {
    height: 1,
    width: '80%',
    background: `${theme.custom.common.blackColor}16`,
    margin: '10px auto'
  },
  middleheader: {
    fontWeight: 'bold',
    padding: '0 20px',
    textAlign: 'center'
  },
  bottomheader: {
    fontSize: 20,
    padding: '0 20px',
    textAlign: 'center'
  }
}));

export default useStyles;
