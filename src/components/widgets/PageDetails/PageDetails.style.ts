import { makeStyles } from '@material-ui/core/styles';
import headerBackground from 'components/images/artist/headerBackground.jpg';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    boxSizing: 'border-box',
    padding: '0 70px',
  },
  intro: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    height: 320,
    backgroundImage: `url(${headerBackground})`,
    backgroundSize: 'cover',
  },
  artistInfo: {
    position: 'relative',
  },
  artistAvatarGroup: {
    width: 140,
    height: 140,
    position: 'relative',
  },
  artistAvatar: {
    width: 140,
    height: 140,
    borderRadius: '50%',
  },
  artistStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: '-12px',
    marginRight: '-12px',
  },
  artistInfoList: {
    fontWeight: 600,
   
  },
  title:{
marginTop:'-40px',

  },
  name: {
    fontWeight: 500,
    fontSize: 18,
    lineHeight:'30px'
    
  },
  actionsList: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid #C4C4C4',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
    top: '100%',
    left: 0,
    position: 'absolute',
    backgroundColor: '#fff',
    '& button': {
      width: '100%',
    },
  },
  actions: {
    position: 'relative',
    marginLeft: 36,
    width: 82,
    height: 40,
  },
  artistInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -70,
    marginBottom: 20,
  },
  actionsButton: {
    width: 82,
    height: 40,
    border: '1px solid #C4C4C4',
    backgroundColor: '#fff',
    borderRadius: 60,
    '&:hover': {
      backgroundColor: '#fff',
      border: '1px solid #555',
    },
  },
  code: {
    marginBottom: 6,
  },
  helpText: {
    marginBottom: 6,
    fontSize: 13,
    letterSpacing: '-0.04em',
    maxWidth: 690,
    color: '#7E7E7E',
  },
  linkToWebPage: {
    color: '#FF00E5',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  artistStatistic: {
    marginBottom: 35,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  artistStatisticItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 34,
    color: '#fff',
    '& svg': {
      marginRight: 8,
      '& path': {
        fill: '#fff !important',
        stroke: 'transparent !important',
      },
    },
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centerAvatar: {
    marginLeft: 158,

    justifyContent: 'center',
  },
  nftBackgroundImage: {
    position: 'absolute',
    top: 23,
    right: 0,
  },
  actionButton: {
    marginLeft: 35,
  },
}));

export default useStyles;
