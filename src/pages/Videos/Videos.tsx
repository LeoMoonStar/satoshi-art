import React, { useState } from 'react';
import { CardMedia } from '@material-ui/core';
import text from '../../constants/content';
import { Link } from 'react-router-dom';
import Button from 'components/button';

import Layout from 'components/layout';
import { LeftArrowIcon } from 'components/icons';

import useStyles from './Videos.style';

export default function Videos() {
	const classes = useStyles()
	const [videos, setVideos] = useState([
		{ 
			key: "0", 
			thumbnail: { photo: '', width: 0, height: 0 }, 
			header: "jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
			miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
			duration: "2:34",
			time: "3 days ago"
		},
		{ 
			key: "1", 
			thumbnail: { photo: '', width: 0, height: 0 }, 
			header: "jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
			miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
			duration: "2:34",
			time: "3 days ago"
		},
		{ 
			key: "2", 
			thumbnail: { photo: '', width: 0, height: 0 }, 
			header: "jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
			miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
			duration: "2:34",
			time: "3 days ago"
		},
		{ 
			key: "3", 
			thumbnail: { photo: '', width: 0, height: 0 }, 
			header: "jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
			miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
			duration: "2:34",
			time: "3 days ago"
		}
	])
	const [mostViewedVideos, setMostViewedVideos] = useState([
		{ key: "row-0", row: [
			{ 
				key: "0", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "1 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "1", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "2 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "2", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "3 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "3", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "4 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			}
		]},
		{ key: "row-1", row: [
			{ 
				key: "4", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "1 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "5", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "2 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "6", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "3 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "7", 
				thumbnail: { photo: '', width: 0, height: 0 }, 
				header: "4 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
				miniHeader: "afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj",
				duration: "2:34",
				time: "3 days ago"
			}
		]}
	])
	const [toggleSeeMore, setToggleSeeMore] = useState(true)
	const [playVideo, setPlayvideo] = useState(false)

	return (
		<Layout>
			<section className={classes.container}>
				<Link className={classes.goBack} to='/'>
					<LeftArrowIcon /> Go Back
				</Link>

				<div className={classes.background}>
					<img className={classes.highlight} src="/video-page-placeholders/videos-background.png"/>

					<div className={classes.row}>
						<div className={classes.leftCol}>
							<h1>Videos</h1>
							<h3>Highlights</h3>
							<div className={classes.mainVideo}>
								{playVideo ? 
									<CardMedia
										style={{ height: 400, width: '100%' }}
									/>
									:
									<div className={classes.mainVideoContainer} style={{ backgroundImage: `url("/video-page-placeholders/main-video.png")` }}>
										<div className={classes.videoPlay} onClick={() => setPlayvideo(true)}>
											<img src="/video-page-placeholders/play-main-video.png"/>
										</div>
										<div className={classes.mainDuration}>2:34</div>
									</div>
								}
							</div>
							<div className={classes.mainInfo}>
								<div className={classes.mainHeader}>jsd sdfjls jflajf lajf slfjaslf jlsafjf</div>
								<div className={classes.mainMiniHeader}>afjalsfj slfj lfjalfjlsafj asfj sfjsa;f dsfj</div>
								<div className={classes.mainTime}>3 days ago</div>
							</div>
						</div>
						<div className={classes.rightCol}>
							{videos.map(video => (
								<div key={video.key} className={classes.video}>
									<div>
										<img src="/video-page-placeholders/video.png"/>
										<div className={classes.videoDuration}>{video.duration}</div>
									</div>
									<div className={classes.videoInfo}>
										<div className={classes.videoHeader}>{video.header}</div>
										<div className={classes.videoHoriz}></div>
										<div className={classes.videoMiniHeader}>{video.miniHeader}</div>
										<div className={classes.videoTime}>{video.time}</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<hr className={classes.horizontal}/>

					<div className={classes.seeMore}>
						<Button onClick={() => setToggleSeeMore(toggleSeeMore ? false : true)}>
							{toggleSeeMore ? "HIDE ALL VIDEOS" : "SEE ALL VIDEOS"}
							<img src="/video-page-placeholders/allvideos.png" style={{ transform: toggleSeeMore ? 'rotate(180deg)' : '' }}/>
						</Button>
					</div>

					{toggleSeeMore && (
						<div className={classes.mostViewedVideosContainer}>
							<div>
								<div className={classes.mostViewedVideosHeader}>Most viewed</div>

								{mostViewedVideos.map(item => (
									<div key={item.key} className={classes.mostViewedVideos}>
										{item.row.map(video => (
											<div key={video.key} className={classes.mostViewedVideo}>
												<div>
													<img src="/video-page-placeholders/main-video.png"/>
													<div className={classes.mostViewedVideoDuration}>{video.duration}</div>
												</div>
												<div className={classes.mostViewedVideoInfo}>
													<div className={classes.mostViewedVideoHeader}>{video.header}</div>
													<div className={classes.mostViewedVideoHoriz}/>
													<div className={classes.mostViewedVideoMiniHeader}>{video.miniHeader}</div>
													<div className={classes.mostViewedVideoTime}>{video.time}</div>
												</div>
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</section>
		</Layout>
	)
}
