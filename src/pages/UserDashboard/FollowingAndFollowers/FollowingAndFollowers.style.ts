import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      display: 'flex',
      marginBottom: 63,
    },
    col: {
      flex: 1,
      '&:not(:first-child)': {
        marginLeft: 15,
      },
    },
    title: {
      fontWeight: 600,
      fontSize: 24,
    },
    items: {
      width: '100%',
      borderRadius: 10,
      boxSizing: 'border-box',
      padding: '23px 29px 32px',
      border: '1px solid #E5E5E5',
    },
    // ITEM
    item: {
      width: '100%',
      display: 'flex',
      padding: '20px 0',
      '&:not(:nth-child(1))': {
        borderTop: '1px solid #6A2FE730',
      },
    },
    itemInfo: {
      flex: 1,
      marginLeft: 17,
      fontSize: 11,
      color: '#7E7E7E',
    },
    topRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
    },
    location: {},
    balance: {},
    bottomRow: {
      marginTop: 16,
      width: '100%',
      display: 'flex',
    },
    bottomCol: {
      marginRight: 13,
      display: 'flex',
      alignItems: 'center',
      fontSize: 11,
      letterSpacing: '-0.04em',
      color: '#7E7E7E',
      '& svg': {
        marginRight: 7,
      },
    },
    userName: {
      letterSpacing: '-0.04em',
      fontSize: 20,
      fontWeight: 600,
      color: '#4D0ED2',
    },
    followingButton: {
      marginLeft: 8,
      width: 68,
      height: 17,
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '-0.04em',
    },
    previewWorks: {
      display: 'flex',
    },
    previewWork: {
      position: 'relative',
      width: 98,
      height: 0,
      paddingBottom: '40%',
      '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      '&:not(first-child)': {
        marginLeft: 10,
      },
    },
    viewAll: {
      display: 'block',
      minWidth: 97,
      lineHeight: '36px',
      margin: '20px auto 0',
    },
  };
});

export default useStyles;
