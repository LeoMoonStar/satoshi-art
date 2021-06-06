import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from 'components/images/supportForm/bg.jpg';

const useStyles = makeStyles(() => {
  return {
    supportText: {
      width: 600,
      maxWidth: '100%',
      margin: '100px auto',
      fontSize: 24,
      textAlign: 'center',
      color: '#7E7E7E',
      lineHeight: '1.6em',
      '& a': {
        color: '#FF0099',
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
    container: {
      width: '100%',
      display: 'flex',
      marginTop: -45,
    },
    leftCol: {
      flex: '1 1 833px',
      padding: '0 129px 94px 236px',
    },
    inputError: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      color: 'red',
    },
    rightCol: {
      position: 'relative',
      flex: '2 1 607px',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      '& img': {
        objectFit: 'cover',
        height: '100%',
      },
    },
    fieldGroup: {
      width: '100%',
      marginBottom: 40,
    },
    form: {
      marginTop: 60,
      '& label': {
        marginBottom: 20,
        fontSize: 14,
        color: '#7E7E7E',
      },
      '& .MuiInputBase-input': {
        height: 46,
        borderRadius: 60,
        border: '1px solid #A5A5A5',
        boxSizing: 'border-box',
        padding: '0 16px',
      },
      '& .MuiInput-formControl': {
        marginTop: 0,
        '&::before, &::after': {
          display: 'none',
        },
      },
      '& .MuiSelect-selectMenu': {
        display: 'flex',
        alignItems: 'center',
      },
      '& .MuiSelect-icon': {
        right: 8,
      },
    },
    textField: {
      '& .MuiInputBase-input': {
        borderRadius: 30,
        padding: '16px',
        height: '223px !important',
      },
    },
    goBack: {
      margin: '44px 0 18px',
      display: 'flex',
      alignItems: 'center',
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-0.04em',
      textDecoration: 'none',
      color: '#000',
      '& svg': {
        marginRight: 12,
      },
    },
    mainTitle: {
      minWidth: 359,
      display: 'inline-block',
      margin: 0,
      paddingBottom: 16,
      lineHeight: '30px',
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: '-0.04em',
      borderBottom: '1px solid #6A2FE730',
    },
    filesLabel: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 166,
      border: '1px dashed #7E7E7E',
      color: '#7E7E7E',
      borderRadius: 20,
      cursor: 'pointer',
      '& span': {
        fontSize: 18,
        fontWeight: 400,
        letterSpacing: '-0.04em',
      },
      '& input': {
        display: 'none',
      },
    },
    fileItem: {
      fontSize: 12,
      margin: '4px 0',
      color: '#ff0099',
      textDecoration: 'underLine #000',
      '& button': {
        padding: 0,
        '& svg': {
          width: 18,
          height: 18,
        },
      },
    },
    nftLabel: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    recaptchaWrapper: {
      marginTop: 39,
    },
  };
});
export default useStyles;
