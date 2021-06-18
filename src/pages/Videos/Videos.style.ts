import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
	return {
		container: {
	      width: '100%',
	      marginTop: -45,
	    },
	    goBack: {
	      margin: '44px 0 18px 200px',
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
	    background: {
	    	backgroundColor: 'black',
	    	borderRadius: '0 100px 0 0',
	    	overflow: 'hidden',
	    	width: '100%'
	    },
	    highlight: {
    		marginBottom: '-150px',
    		marginLeft: 'calc(100vw - 1152px)'
    	},
	    row: {
	    	display: 'flex',
	    	flexDirection: 'row',
	    	justifyContent: 'space-around',
	    	margin: '-250px 0px 50px 0px',
	    },
	    leftCol: {
	    	'& h1': {
	    		color: 'white',
	    		fontSize: 50
	    	},
	    	'& h3': {
	    		color: 'white',
	    		fontSize: 30
	    	}
	    },
	    mainVideo: {
	    	'& img': {
	    		position: 'absolute',
	    		width: '50%',
	    	}
	    },
	    mainVideoContainer: {
	    	backgroundRepeat: 'no-repeat',
	    	backgroundSize: '100% 100%',
	    	height: 400,
	    	width: '100%'
	    },
	    mainDuration: {
	    	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	    	borderRadius: 3,
			color: 'white',
			float: 'right',
			margin: '350px 30px 0 0',
			padding: 5
	    },
	    videoPlay: {
	    	height: 110,
	    	margin: '170px 0 0 320px',
	    	position: 'absolute',
	    	width: 110,

	    	'&:hover': {
	    		cursor: 'pointer',
	    		opacity: 0.5
	    	}
	    },
	    mainInfo: {
	    	color: 'white',
	    	width: 700
	    },
	    mainHeader: {
	    	fontSize: 30,
	    	fontWeight: 'bold'
	    },
	    mainMiniHeader: {
	    	fontSize: 15,
	    	margin: '10px 0'
	    },
	    mainTime: {
	    	fontSize: 15,
	    	fontWeight: 'bold'
	    },
	    rightCol: {
	    	marginTop: 215
	    },
	    video: {
	    	display: 'flex',
	    	flexDirection: 'row',
	    	marginBottom: 10,
	    	width: 500,

	    	'& img': {
	    		height: 120
	    	},

	    	'&:hover': {
	    		cursor: 'pointer',
	    		opacity: 0.5
	    	}
	    },
	    videoDuration: {
	    	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	    	borderRadius: 3,
			color: 'white',
			margin: '-35px 0 0 166px',
			padding: 5,
			position: 'absolute',
	    },
	    videoInfo: {
	    	color: 'white',
	    	margin: '0 10px',

	    	'& hr': {
	    		borderColor: 'rgba(127, 127, 127, 0.5)',
	    		borderStyle: 'solid',
	    		borderWidth: '0.1',
	    		margin: '-30px 0',
	    		width: 220
	    	}
	    },
	    videoHeader: {
	    	fontWeight: 'bold'
	    },
	    videoHoriz: {
	    	backgroundColor: 'rgba(127, 127, 127, 0.5)',
			height: 2,
			margin: '10px 0',
			width: 220
	    },
	    videoMiniHeader: {
	    	marginBottom: 20
	    },
	    videoTime: {
	    	fontWeight: 'bold'
	    },
	    horizontal: {
	    	margin: '0 100px'
	    },
	    seeMore: {
	    	margin: '-20px auto 100px auto',
	    	width: 198,

	    	'& button': {
	    		backgroundColor: 'black',
		    	border: '1px solid #fff',
		    	borderRadius: 60,
		    	color: '#fff',
		    	padding: '5px 20px',

		    	'&:hover': {
		    		backgroundColor: 'black'
		    	},

		    	'& img': {
		    		margin: '0 10px'
		    	}
	    	}
	    },
	    mostViewedVideosContainer: {
	    	display: 'flex',
	    	flexDirection: 'row',
	    	justifyContent: 'space-around'
	    },
	    mostViewedVideosHeader: {
	    	color: 'white',
	    	fontSize: 30,
	    	fontWeight: 'bold',
	    	margin: '0 0 50px 20px'
	    },
	    mostViewedVideos: {
	    	display: 'flex',
	    	flexDirection: 'row',
	    	margin: '50px 0'
	    },
	    mostViewedVideo: {
	    	margin: '0 20px',
	    	width: 250,

	    	'& img': {
	    		width: 270
	    	},

	    	'&:hover': {
	    		cursor: 'pointer',
	    		opacity: 0.5
	    	}
	    },
	    mostViewedVideoThumbnail: {
	    	margin: '0 auto',
	    	width: 270
	    },
	    mostViewedVideoDuration: {
	    	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	    	borderRadius: 3,
			color: 'white',
			margin: '-35px 0 0 196px',
			padding: 5,
			position: 'absolute',
	    },
	    mostViewedVideoInfo: {
	    	color: 'white',
	    	height: 150,
	    	margin: '0px auto 0 auto'
	    },
	    mostViewedVideoHeader: {
	    	fontWeight: 'bold'
	    },
	    mostViewedVideoHoriz: {
	    	backgroundColor: 'rgba(127, 127, 127, 0.5)',
			height: 2,
			margin: '10px 0',
			width: 270
	    },
	    mostViewedVideoMiniHeader: {
	    	marginBottom: 20
	    },
	    mostViewedVideoTime: {
	    	fontWeight: 'bold'
	    },
	}
})

export default useStyles;
