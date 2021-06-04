import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  const artistLinkStyles = {
    textDecoration: 'none',
    color: '#000',
    '&:hover': {
      cursor: 'pointer',
    },
  };

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    ownerContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 18,
      ...artistLinkStyles,
    },
    creatorContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '18px 0px 26px 0px',
      ...artistLinkStyles,
    },
    collectionContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 25,
      ...artistLinkStyles,
    },
    divider: {
      height: 1,
      width: '100%',
      background: `${theme.custom.common.blackColor}16`,
    },
    imageWrapper: {
      position: 'relative',
    },
    iconContainer: {
      position: 'absolute',
      top: -5,
      right: 0,
    },
    iconWrapper: {
      width: 16,
      height: 16,
      backgroundColor: theme.custom.common.yellowColor,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profilePhoto: {
      width: 48,
      height: 48,
      borderRadius: 40,
    },
    artistInfo: {
      marginLeft: 13,
    },
    artistRole: {
      color: theme.custom.common.darkerGrayColor,
    },
  };
});

export default useStyles;
