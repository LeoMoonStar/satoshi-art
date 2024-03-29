import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    width: '40px',
    height: '40px',
    position: 'relative',
  },
  image: {
    // width: '1em',
    // height: '1em',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  },
  status: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '0.35em',
    height: '0.35em',
    marginTop: '-0.05em',
    marginRight: '-0.05em',
  },
  pointer: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
