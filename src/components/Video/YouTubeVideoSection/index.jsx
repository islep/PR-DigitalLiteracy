import React, { useState, useEffect } from 'react';
import '../../../Layouts/Main/YouTubeVideo/youtubeVideo.css';
import { Box, Grid, CircularProgress } from '@mui/material';
import { TagsInput } from 'react-tag-input-component';
import YoutubeEmbed from '../../../Layouts/Main/YouTubeVideo/youtubeVideoEmbed';
import { Colors } from '../../../constants/Colors';
import './youtubeVideoSection.css';
import { set } from 'lodash';
import PropTypes from 'prop-types';

export function YouTubeVideoSection({ osvalue, subtopicValue, tags, appliedFilterTags }) {
	// this is just a parameter to hide videos without a subtopic during testing
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
					videoId,
				});
			});
		};

		setVideos(osvalue);
	}, [osvalue]);

	useEffect(() => {
		// retrieve all videos
		const videos = osvalue.filter(
			(video) => (videoTags, inputTags) => inputTags.every((inputTag) => videoTags.includes(inputTag)),
		);

		// filter by content type
		const categoryVideos = videos.filter((video) => appliedFilterTags.includes(video.category));

		// filter by operating system
		const osVideos = categoryVideos.filter(
			(video) =>
				video.operating_system.includes('All') ||
				(!Array.isArray(video.operating_system) &&
					videos.filter((video) => appliedFilterTags.includes(video.operating_system))) ||
				(Array.isArray(video.operating_system) && video.operating_system.some((os) => appliedFilterTags.includes(os))),
		);

		// filter by subtopic
		const subtopicVideos = osVideos.filter(
			(video) =>
				(showSubtopicUndefinedVideos && !video.subtopic) ||
				(video.subtopic && (subtopicValue.length == 0 || subtopicValue == video.subtopic)),
		);

		// filter by tags
		const tagVideos = subtopicVideos.filter(
			(video) =>
				tags.length === 0 ||
				(!Array.isArray(video.tags) && videos.filter((video) => tags.includes(video.tags))) ||
				(Array.isArray(video.tags) && video.tags.some((tag) => tags.includes(tag))),
		);

		setVideos(tagVideos);
	}, [tags, osvalue, subtopicValue, appliedFilterTags]);

	// this was the previous code but we had to modify below to have the stopTimes keep working -Capstone group
	/*if (videos && videos.length > 0) {
		return (
			<div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-screen-xl">
				{videos.map((video, index) => (
					<div key={video.key}>
						<div className="h-72 w-full" id={`player-${index}`} />
					</div>
				))}
			</div>
		);
	}*/
	if (videos && videos.length > 0) {
		return (
			<div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-screen-xl">
				{videos.map((video) => {
					const match = video.url.match(videoIdRegex);
					const embedId = match ? match[1] : null;

					return(
						<Grid item xs={8} sm={4} md={6} key={video.tags}>
							<YoutubeEmbed embedId={embedId} stopTimes={video.stopTimes} messages={video.messages} />
						</Grid>
					)

				})}
			</div>
		);
	}



	return (
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
				marginBottom: '10%',
			}}
		>
			No results found
		</Box>
	);
}

YouTubeVideoSection.propTypes = {
	osvalue: PropTypes.array.isRequired,
	subtopicValue: PropTypes.string.isRequired,
	tags: PropTypes.array,
	appliedFilterTags: PropTypes.array,
};

export default YouTubeVideoSection;
