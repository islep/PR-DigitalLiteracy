import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

import Breadcrumb from '../../../components/Video/Breadcrumb';
import FilterPanel from '../../../components/FilterPanel';
import SearchBar from '../../../components/Video/Searchbar';
import SubtopicSelection from '../../../components/Video/SubtopicSelection';
import YouTubeVideoSection from '../../../components/Video/YouTubeVideoSection';
import getVideosFromFirebaseData from '../../../utils/Firebase/getVideosFromFirebaseData';
import Intro from '../../../components/Video/Intro';
import { FILTERGROUPS, SUBTOPICGROUPS } from './constants';

function TechVideos({ initialPageContent, introText }) {
	// FINAL values that should be refactored out at some point
	// side filter options unsorted tuple (label, database_value) array
	const [filterGroups] = useState(() => FILTERGROUPS);

	const [subtopicGroups] = useState(() => SUBTOPICGROUPS);

	// video database values
	const [videoValue, setVideoValue] = useState([]);
	const [dataFromFirebase, setDatafromFirebase] = useState([]);
	const docRef = collection(db, 'youtube-videos');

	// video search constants
	const [subtopicValue, setsubtopicValue] = useState([]); // current subtopic selected
	const [tags, tagsFromSearchBar] = useState([]); // tags from the search bar

	// Stores database_value from filter. Content type is filtered out depending on page selected.
	// Currently intialized to all values. In the future this can be replaced to potentially store the users state returning to page
	const [appliedFilterTags, setTagsFromFilter] = useState(
		filterGroups.flatMap(({ subheading, filters }) =>
			subheading === 'Content Type'
				? filters.filter(([, value]) => value === initialPageContent).map(([, value]) => value)
				: filters.map(([, value]) => value),
		),
	);

	// displays subtopics based on the content type selected
	const [displayedSubtopics, setDisplayedSubtopics] = useState(
		subtopicGroups.find(([value]) => value === initialPageContent)?.[1] || [],
	);

	// subscribe to changes when a Firestore document referenced
	useEffect(() => {
		console.log('useEffect 1');
		const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
			const videos = querySnapshot.docs.map((doc) => doc.data());
			setDatafromFirebase(Object.values(videos));
		});

		return unsubscribe;
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getVideosFromFirebaseData(dataFromFirebase, setVideoValue);
	}, [dataFromFirebase]);

	// set value from user clicking on subtopic
	const dataFromSubtopicSelector = (val) => {
		setsubtopicValue(val);
	};

	// reset subtopic when user clicks on breadcrumb
	const handleResetSubtopic = () => {
		setsubtopicValue([]);
	};

	// update displayed subtopics based on filter side panel
	const updateDisplayedSubtopics = (selectedFilterTags) => {
		const commonContent = selectedFilterTags.filter((tag) => subtopicGroups.some(([value]) => value.includes(tag)));
		const combinedSubtopics = commonContent.flatMap(
			(tag) => subtopicGroups.find(([value]) => value === tag)?.[1] || [],
		);

		if (!combinedSubtopics.includes(subtopicValue)) {
			handleResetSubtopic();
		}

		setDisplayedSubtopics(combinedSubtopics);
	};

	// saves selected filters in the side panel
	const onSave = (selectedFilterTags) => {
		updateDisplayedSubtopics(selectedFilterTags);
		setTagsFromFilter(selectedFilterTags);
	};

	return (
		<div>
			<FilterPanel filterGroups={filterGroups} onSave={onSave} appliedFilterTags={appliedFilterTags} />

			<div className="md:pl-80">
				<Box sx={{ margin: '0% 10%' }}>
					<Intro introText={introText} />
				</Box>

				<Box className="mx-32" style={{ paddingBottom: '2rem' }}>
					<SearchBar tagsFromSearchBar={tagsFromSearchBar} tags={tags} />
					<Breadcrumb
						subtopicValue={subtopicValue}
						handleResetSubtopic={handleResetSubtopic}
						subtopics={displayedSubtopics}
					/>
				</Box>

				{/* if there is are no subtopics, a subtopic is selected, or someone searched a tag in the search bar display videos */}
				{displayedSubtopics.length === 0 || subtopicValue.length > 0 || tags.length > 0 ? (
					<div className="flex mx-32 justify-center">
						<YouTubeVideoSection
							osvalue={videoValue}
							subtopicValue={subtopicValue}
							tags={tags}
							appliedFilterTags={appliedFilterTags}
						/>
					</div>
				) : (
					<div className="flex mx-32 justify-center">
						<SubtopicSelection dataFromSubtopicSelector={dataFromSubtopicSelector} subtopics={displayedSubtopics} />
					</div>
				)}
			</div>
		</div>
	);
}

TechVideos.propTypes = {
	initialPageContent: PropTypes.string.isRequired,
	introText: PropTypes.string.isRequired,
};

export default TechVideos;
