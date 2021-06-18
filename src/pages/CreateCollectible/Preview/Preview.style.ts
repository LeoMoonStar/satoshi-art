import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    transferContainer:{
      borderRadius: 15,
      marginTop: '20px',
      padding:'10px',
      border: '1px solid #E5E5E5',
    },
    transferContainerInputBox:{
      border: '1px solid #E5E5E5',
      borderRadius: 10,
      width:'100%',
      padding:'5px'
    },
    transferContainerButton:{
      backgroundColor: '#FF0099',
      marginTop:'10px',
      borderRadius:10,
      width:'100%',
      color:'#ffffff',
      "&:hover": {
        //backgroundColor: "#0E47EF",
        color: "#FF0099",
        backgroundColor: '#ffffff',
        border: '1px solid #FF0099',

        
      },
    },
    previewWrapper: {
      marginLeft: 132,
    },
    lockableContent: {
      marginBottom: 16,
    },
    subtitle: {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: '23px',
      marginBottom: 24,
    },
    previewArea: {
      position: 'relative',
      width: 268,
      height: 346,
      background: theme.palette.primary.main,
      border: '1px solid #E5E5E5',
      borderRadius: 20,
    },
    previewImgWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 190,
      minHeight: 220,
      margin: '0 auto',

      '& img': {
        width: '100%',
      },
    },
    placeholder: {
      width: 170,
      position: 'absolute',
      top: '50%',
      left: '50%',
      fontSize: 16,
      lineHeight: '20px',
      fontWeight: 600,
      textAlign: 'center',
      color: theme.custom.common.darkerGrayColor,
      transform: 'translateX(-50%) translateY(-50%)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      height: 346,
      justifyContent: 'space-around',
      padding: 20,
    },
    contentHeader: {
      color: theme.custom.common.darkerGrayColor,
      fontSize: 15,
      textAlign: 'center',
    },
    references: {
      display: 'flex',

      '& div': {
        marginLeft: '-10px',

        '&:first-child': {
          marginLeft: 0,
        },
      },
    },
    previewDscr: {
      marginTop: 16,
    },
    unlockableContent: {
      width: '100%',
      boxSizing: 'border-box',
      marginTop: 20,
      background: theme.palette.primary.main,
      border: '1px solid #E5E5E5',
      borderRadius: 20,
      padding: 24,
    },
  };
});
export default useStyles;
