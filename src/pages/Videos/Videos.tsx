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
			id: "1-c99d-ddic9div999v-0",
			thumbnail: { photo: '/video-page-placeholders/video.png', width: 0, height: 0 }, 
			header: "this is the header for regular video 0", 
			miniHeader: "this is the mini header for regular video 0",
			duration: "2:00",
			time: "1 days ago"
		},
		{ 
			key: "1", 
			id: "1-c99d-ddic9div999v-1",
			thumbnail: { photo: '/video-page-placeholders/video.png', width: 0, height: 0 }, 
			header: "this is the header for regular video 1", 
			miniHeader: "this is the mini header for regular video 1",
			duration: "3:00",
			time: "2 days ago"
		},
		{ 
			key: "2", 
			id: "1-c99d-ddic9div999v-2",
			thumbnail: { photo: '/video-page-placeholders/video.png', width: 0, height: 0 }, 
			header: "this is the header for regular video 2", 
			miniHeader: "this is the mini header for regular video 2",
			duration: "4:00",
			time: "3 days ago"
		},
		{ 
			key: "3", 
			id: "1-c99d-ddic9div999v-3",
			thumbnail: { photo: '/video-page-placeholders/video.png', width: 0, height: 0 }, 
			header: "this is the header for regular video 3", 
			miniHeader: "this is the mini header for regular video 3",
			duration: "5:00",
			time: "4 days ago"
		}
	])
	const [mostViewedVideos, setMostViewedVideos] = useState([
		{ key: "row-0", row: [
			{ 
				key: "0",
				id: "1-xfds9f9ds8fsdisod-0", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 0", 
				miniHeader: "this is the mini header for most viewed video 0",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "1",
				id: "1-xfds9f9ds8fsdisod-1", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 1", 
				miniHeader: "this is the mini header for most viewed video 1",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "2",
				id: "1-xfds9f9ds8fsdisod-2", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 2", 
				miniHeader: "this is the mini header for most viewed video 2",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "3",
				id: "1-xfds9f9ds8fsdisod-3", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 3", 
				miniHeader: "this is the mini header for most viewed video 3",
				duration: "2:34",
				time: "3 days ago"
			}
		]},
		{ key: "row-1", row: [
			{ 
				key: "4",
				id: "1-xfds9f9ds8fsdisod-4", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 4", 
				miniHeader: "this is the mini header for most viewed video 4",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "5",
				id: "1-xfds9f9ds8fsdisod-5", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 5", 
				miniHeader: "this is the mini header for most viewed video 5",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "6",
				id: "1-xfds9f9ds8fsdisod-6", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 6", 
				miniHeader: "this is the mini header for most viewed video 6",
				duration: "2:34",
				time: "3 days ago"
			},
			{ 
				key: "7",
				id: "1-xfds9f9ds8fsdisod-7", 
				thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
				header: "this is the header for most viewed video 7", 
				miniHeader: "this is the mini header for most viewed video 7",
				duration: "2:34",
				time: "3 days ago"
			}
		]}
	])
	const [toggleSeeMore, setToggleSeeMore] = useState(true)
	const [play, setPlay] = useState(false)
	const [mainVideoInfo, setMainvideoinfo] = useState({
		id: "1-xfds9f9ds8fsdisod-0", 
		thumbnail: { photo: '/video-page-placeholders/main-video.png', width: 0, height: 0 }, 
		header: "1 jsd sdfjls jflajf lajf slfjaslf jlsafjf", 
		miniHeader: "this is the mini header for most viewed video 0",
		duration: "2:34",
		time: "3 days ago"
	})

	const playVideo = (type: string, videoid: string) => {
		switch (type) {
			case "regular":
				videos.forEach(function (video) {
					if (video.id == videoid) {
						setMainvideoinfo(video)
					}
				})

				break
			case "mostviewed":
				mostViewedVideos.forEach(function (info) {
					info.row.forEach(function (video) {
						if (video.id == videoid) {
							setMainvideoinfo(video)
						}
					})
				})

				break
			default:
		}
	}

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
								{play ? 
									<CardMedia
										style={{ height: 400, width: '100%' }}
									/>
									:
									<div className={classes.mainVideoContainer} style={{ backgroundImage: "url('" + mainVideoInfo.thumbnail.photo + "')" }}>
										<div className={classes.videoPlay} onClick={() => setPlay(true)}>
											<img src="/video-page-placeholders/play-main-video.png"/>
										</div>
										<div className={classes.mainDuration}>2:34</div>
									</div>
								}
							</div>
							<div className={classes.mainInfo}>
								<div className={classes.mainHeader}>{mainVideoInfo.header}</div>
								<div className={classes.mainMiniHeader}>{mainVideoInfo.miniHeader}</div>
								<div className={classes.mainTime}>{mainVideoInfo.time}</div>
							</div>
						</div>
						<div className={classes.rightCol}>
							{videos.map(video => (
								<div key={video.key} className={classes.video} onClick={() => playVideo("regular", video.id)}>
									<div>
										<img src={video.thumbnail.photo}/>
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
											<div key={video.key} className={classes.mostViewedVideo} onClick={() => playVideo("mostviewed", video.id)}>
												<div className={classes.mostViewedVideoThumbnail}>
													<img src={video.thumbnail.photo}/>
												</div>
												<div className={classes.mostViewedVideoDuration}>{video.duration}</div>
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
