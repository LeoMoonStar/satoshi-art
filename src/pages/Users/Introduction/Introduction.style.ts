import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    titleWrapper: {
      display: 'flex',
      alignItems: 'baseline',
    },
    title: {
      fontWeight: 800,
      fontSize: 30,
      letterSpacing: '-0.04em',
      marginLeft: 70
    },
    resultsCount: {
      fontSize: 20,
      color: '#7E7E7E',
      margin: '0 auto 0 12px',
    },
    select: {
      minWidth: 166,
      height: 40,
      marginLeft: 16,
      '& .MuiSvgIcon-root': {
        marginLeft: 5,
      },
      '& > div': {
        fontSize: 13,
        height: 27,
        letterSpacing: '-0.04em',
        fontWeight: 600,
        color: '#7E7E7E',
      },
    },
    rightCol: {
      display: 'flex',
      flexDirection: 'column',
    },
    filterGroup: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 25,
    },
    tabs: {
      marginRight: 100,
      
      '& button': {
        marginRight: 4,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '-0.04em',
        backgroundColor: 'transparent',
        border: 0,
        color: '#7E7E7E',
        cursor: 'pointer',
        '&.selected': {
          color: '#000',
        },
      },
    },
    selectsGroup: {},
    filterButton: {},
  };
});
export default useStyles;
