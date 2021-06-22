import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buyButton:{width: 157,
      height: 40,
      textAlign:'center',
      backgroundColor: theme.custom.common.pinkColor,
      color: theme.palette.primary.main,
      borderRadius: 40},
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
    textAlign: 'center',
    color:theme.custom.common.pinkColor
  },
  divider: {
    height: 1,
    width: '80%',
    //background: `${theme.custom.common.blackColor}16`,
    margin: '10px auto'
  },
  middleheader: {
    fontWeight: 'bold',
    padding: '0 20px',
    textAlign: 'center'
  },
  bottomheader: {
    fontSize: 28,
    padding: '0 20px',
    textAlign: 'center',
    color:'#5113D5',
    fontWeight:800
  }
}));

export default useStyles;
