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
      // border: '1px solid #E5E5E5',
      // borderRadius: 10,
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
    // transferContainer:{
      
    //   marginTop:'550px',
    //   marginRight:'300px'
    // },
    form: {
      display: 'flex',
    },
    settings: {
      width: 568,
    },
    title: {
      display: 'inline-block',
      fontWeight: 800,
      fontSize: 30,
      lineHeight: '38px',
      borderBottom: '1px solid #6A2FE74D',
      paddingBottom: 7,
      marginBottom: 20,
    },
    upload: {
      marginBottom: 32,
    },
    uploadWrapper: {
      position: 'relative',
      color: theme.custom.common.darkerGrayColor,
      fontSize: 18,
      padding: '38px 0 32px 0',
      lineHeight: '23px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      border: '1px dashed #7E7E7E',
      borderRadius: 20,
    },
    closeBtn: {
      position: 'absolute',
      right: 10,
      top: 10,
    },
    uploadPreview: {
      width: 300,

      '& img, & video': {
        width: '100%',
      },
    },
    subtitle: {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: '23px',
      marginBottom: 24,
    },
    chooseBtn: {
      width: 136,
      color: theme.custom.common.pinkColor,
      border: `1px solid ${theme.custom.common.pinkColor}`,
      marginTop: 38,
      borderRadius: 60,
    },
    controls: {
      width: '100%',

      '& label, & div': {
        width: '100%',
      },
    },
    switchWrapper: {},
    switchLabel: {
      margin: '0 0 32px 0',
      '& .MuiFormControlLabel-label': {
        flex: 1,
        color: '#7E7E7E',
        '& span': {
          display: 'block',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '22px',
          marginTop: 5,

          '&:first-child': {
            display: 'block',
            fontSize: 18,
            margin: 0,
            lineHeight: '23px',
            fontWeight: 600,
          },
        },
      },
    },
    labelText: {
      display: 'block',

      '& span': {
        display: 'block',
      },
    },
    onSale: {
      color: theme.custom.common.pinkColor,
    },
    price: {
      color: theme.custom.common.blackColor,
    },
    unlock: {
      background: 'linear-gradient(to right, #6A2FE7 5%, #FF0099 20%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
    cards: {
      display: 'flex',
    },
    collectionType: {
      marginBottom: 32,
    },
    card: {
      width: 148,
      height: 160,
      border: '1px solid #E5E5E5',
      borderRadius: 20,
      marginLeft: 20,

      '&:first-child': {
        marginLeft: 0,
      },
      '& span': {
        display: 'block',
      },
    },
    cardActive: {
      border: '1px solid #2d81ff',
    },
    cardName: {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '16px',
      color: theme.custom.common.blackColor,
    },
    cardDscr: {
      color: theme.custom.common.darkerGrayColor,
      fontSize: 12,
      lineHeight: '15px',
    },
    propertiesWrapper: {
      width: 438,
      marginBottom: 60,
    },
    input: {
      marginBottom: 32,
      '& .MuiInput-root': {
        width: '100%',
        borderBottom: '1px solid #7E7E7E4D',
      },
      '& span': {
        display: 'inline-block',
        marginTop: 8,
        lineHeight: '16px',
        fontSize: 12,
        color: theme.custom.common.grayColor,
      },
      '& input+span': {
        fontSize: 16,
      },
    },
    label: {
      fontWeight: 600,
      display: 'block',
      cursor: 'pointer',
      fontSize: 18,
      lineHeight: '23px',
      color: theme.custom.common.blackColor,
      marginBottom: 24,
    },
    sizes: {
      display: 'flex',
      justifyContent: 'space-between',

      '& .MuiInput-root': {
        width: 197,
      },
    },
    footer: {
      width: 380,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#FFB800',
      fontWeight: 600,
      fontSize: 12,
      '& button': {
        width: 165,
        fontSize: 13,
        border: '1px solid transparent',
        background: theme.custom.common.pinkColor,
        color: theme.palette.primary.main,
        borderRadius: 60,

        '&:hover': {
          background: 'none',
          color: theme.custom.common.blackColor,
          border: `1px solid ${theme.custom.common.pinkColor}`,
        },
      },
    },
    switch: {
      width: 47,
      height: 24,
      padding: 0,

      '& .MuiSwitch-switchBase': {
        color: '#ffffff',
        padding: 4,
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#FF0099',
          opacity: 1,
        },
      },
      '& .MuiSwitch-thumb': {
        width: 16,
        height: 16,
        boxShadow: 'none',
      },
      '& .MuiSwitch-track': {
        borderRadius: 16,
        opacity: 1,
        backgroundColor: '#FF009926',
      },
    },
    uploadError: {
      border: '1px solid #FF0000',
    },
    textError: {
      color: '#FF0000',
    },
    inputError: {
      '& .MuiInput-root': {
        borderBottom: '1px solid #FF0000',
      },
    },
    priceInfo: {
      '& span': {
        color: theme.custom.common.blackColor,
        display: 'block',
      },
    },
  };
});
export default useStyles;
