import React, { useState, useEffect } from 'react';
import '../../../../src/Layouts/Main/YouTubeVideo/youtubeVideo.css';
import { Box, Grid, CircularProgress } from '@mui/material';
import { TagsInput } from 'react-tag-input-component';
import YoutubeEmbed from '../../../Layouts/Main/YouTubeVideo/youtubeVideoEmbed';
import { Colors } from '../../../constants/Colors';
import './youtubeVideoSection.css';
import { set } from 'lodash';
import PropTypes from 'prop-types';


export function YouTubeVideoSection({ osvalue, subtopicValue, tags, appliedFilterTags }) {

	// this is just a parameter to hide videos without a subtopic during development
	const showSubtopicUndefinedVideos = true;

	const [videos, setVideos] = useState(osvalue || []);
	console.log('Initial osvalue:', osvalue);
	const videoIdRegex =
		/(?:(?:https?:\/\/)?(?:www\.)?)?youtu(?:\.be\/|be.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w'-]+)/i;


	useEffect(() => {
		if (window.YT && window.YT.Player && Array.isArray(videos)) {
			videos.forEach((video, index) => {
				const match = video.url.match(videoIdRegex);
				const videoId = match ? match[1] : null;
				new window.YT.Player(`player-${index}`, {
					height: '390',
					width: '640',
					videoId,
				});
			});
		}
	}, [videos]);

	// console.log(videos);
	useEffect(() => {
		// Load the IFrame Player API code asynchronously.
		if (!window.YT) {
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}

		window.onYouTubeIframeAPIReady = () => {
			videos.forEach((video, index) => {
				const match = video.url.match(videoIdRegex);
				const videoId = match ? match[1] : null;
				new window.YT.Player(`player-${index}`, {
					height: '390',
					width: '640',
					videoId,
				});
			});
		};

		setVideos(osvalue);
	}, [osvalue]);

	useEffect(() => {
		// retrieve all videos
		const videos = osvalue.filter((video) => {
			return (videoTags, inputTags) => inputTags.every((inputTag) => videoTags.includes(inputTag));
		});

		// filter by content type
		const categoryVideos = videos.filter((video) => appliedFilterTags.includes(video.category));

		// filter by operating system
		const osVideos = categoryVideos.filter((video) => {
			return video.operating_system.includes('All') || (!Array.isArray(video.operating_system) && videos.filter((video) => appliedFilterTags.includes(video.operating_system))) || (Array.isArray(video.operating_system) && video.operating_system.some(os => appliedFilterTags.includes(os)));
		});

		// filter by subtopic
		const subtopicVideos = osVideos.filter((video) => {
			return (showSubtopicUndefinedVideos && !video.subtopic) || (video.subtopic && (subtopicValue.length == 0 || subtopicValue == (video.subtopic)));
		});

		// filter by tags
		const tagVideos = subtopicVideos.filter((video) => {
			return tags.length === 0 || videos(video.tags, tags);
		});

		setVideos(tagVideos);

	}, [tags, osvalue, subtopicValue, appliedFilterTags]);

	return (
		console.log('videos:', { videos }),
		<>
			{videos && videos.length > 0 ? (
				<Box sx={{ margin: 'auto', width: '70%' }}>
					<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 8, md: 12 }}>
						{videos.map((video, index) => (
							<Grid item xs={8} sm={4} md={6} key={video.key}>
								<div id={`player-${index}`} />
							</Grid>
						))}
					</Grid>
				</Box>
			) : (
				<Box
					sx={{
						fontFamily: 'Inria Sans',
						color: Colors.primaryColor,
						textAlign: 'center',
						fontWeight: '700',
						padding: '2rem',
						fontSize: {
							md: '2rem',
							sm: '2.25rem',
							xs: '1.25rem',
						},
					}}
				>
					No results found
				</Box>
			)}
		</>
	);
}

YouTubeVideoSection.propTypes = {
	osvalue: PropTypes.array.isRequired,
	subtopicValue: PropTypes.string.isRequired,
	tags: PropTypes.array,
	appliedFilterTags: PropTypes.array,
};

export default YouTubeVideoSection;