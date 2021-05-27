import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    outline: 0,
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 350,
    backgroundColor: '#fff',
    padding: '20px 64px',
    boxSizing: 'border-box',
    border: 0,
    outline: 0,
    borderRadius: 20,
  },
}));

export default useStyles;
