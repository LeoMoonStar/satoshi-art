import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    container: {
      width: '100%',
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    mainTitle: {
      marginBottom: 7,
      fontSize: 24,
      lineHeight: '30px',
      fontWeight: 600,
    },
    subTitle: {
      color: '#C4C4C4',
    },
    datepickerFieldGroup: {
      position: 'relative',
      width: 220,
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: 9,
      boxSizing: 'border-box',
      padding: '0 0 0 20px',
      border: '1px solid #E5E5E5',
      cursor: 'pointer',
    },
    dateIcon: {
      width: 36,
      height: 36,
      marginRight: 12,
      borderRadius: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF009915',
    },
    modal: {
      width: 278,
      minHeight: 298,
      marginTop: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& .react-datepicker': {
        border: 0,
      },
      '& .react-datepicker__day': {
        fontSize: 11,
      },
      '& .react-datepicker__header': {
        backgroundColor: 'transparent',
        borderBottom: 0,
      },
      '& .react-datepicker__day-name': {
        height: '1rem',
        color: '#FF0099',
      },
      '& .react-datepicker__day--keyboard-selected, & .react-datepicker__day--selected,  & .react-datepicker__day--in-range, &  .react-datepicker__day--in-selecting-range':
        {
          position: 'relative',
          color: '#fff',
          backgroundColor: '#FF0099',
          borderRadius: '50%',
        },
      '&  .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--selected)': {
        opacity: '0.7',
      },
      '& .react-datepicker__day--outside-month': {
        color: '#BDBDBD',
      },
    },
    buttonsRow: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 0 18px',
    },
    cancelBtn: {
      marginLeft: 40,
      fontWeight: 700,
      fontSize: 11,
      color: '#7E7E7E',
      textTransform: 'initial',
    },
    doneBtn: {
      marginRight: 31,
      minWidth: 74,
      height: 30,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 3,
    },
    datepickerTitle: {
      marginBottom: 3,
      '& svg': {
        position: 'absolute',
        top: 14,
        right: 14,
      },
    },
    timeRange: {
      fontSize: 9,
    },
    customDatePickerHeader: {
      width: '100%',
      display: 'flex',
      margin: '8px 0',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    month: {
      fontSize: 14,
      fontWeight: 700,
    },
    nextArrow: {
      '& svg': {
        transform: 'rotateZ(180deg)',
      },
    },
    controlsPaper: {
      border: '1px solid #E5E5E5',
      borderRadius: 9,
      backgroundColor: '#fff',
    },
  };
});

export default useStyles;
