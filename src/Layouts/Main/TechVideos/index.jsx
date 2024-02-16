
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Breadcrumb } from '../../../components/Video/Breadcrumb';
import FilterPanel from '../../../components/FilterPanel';
import Searchbar from '../../../components/Video/Searchbar';
import SubtopicSelection from '../../../components/Video/SubtopicSelection';
import YouTubeVideoSection from '../../../components/Video/YouTubeVideoSection';
import FirebaseRetrieveVideos from '../../../components/Video/FirebaseRetrieveVideos';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import Intro from '../../../components/Video/Intro';
import PropTypes from 'prop-types';
import { filter } from 'lodash';

function TechVideos({ initialPageContent, introText }) {

	// FINAL values that should be refactored out at some point
	// side filter options unsorted tuple (label, database_value) array
	const [filterGroups] = useState(() => [
		{
			subheading: 'Device Type',
			filters: [
				['Mobile - iOS', 'iOS'],
				['Mobile - Android', 'Android'],
				['Desktop - Windows', 'Windows'],
				['Desktop - Mac', 'Mac'],
				['Desktop - Linux', 'Linux'],
			],
		},
		{
			subheading: 'Content Type',
			filters: [
				['Daily Life', 'daily_life'],
				['Finance', 'finance'],
				['Safety Privacy', 'safety_privacy'],
				['Class & Work', 'class_word'],
			],
		},
	]);

	const [subtopicsGroups] = useState(() => [
		['daily_life', []],
		['finance', ['Using & Managing credit and debit cards', 'Maintaining Credit score', 'Bank Accounts', 'Savings & Interest', 'Financial scams', 'Investments & risks']],
		['safety_privacy', []],
		['class_word', []],
	])

	// video database values
	const [osvalue, setosValue] = useState([]);
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
				: filters.map(([, value]) => value)
		)
	);

	// displays subtopics based on the content type selected
	const [displayedSubtopics, setDisplayedSubtopics] = useState(
		subtopicsGroups.find(([value]) => value === initialPageContent)?.[1] || []
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

	// set videos from Firebase
	const dataFromIntro = (osvalue) => {
		setosValue(osvalue);
	};

	// set value from user clicking on subtopic
	const dataFromSubtopicSelector = (subtopicValue) => {
		setsubtopicValue(subtopicValue);
	};

	// reset subtopic when user clicks on breadcrumb
	const handleResetSubtopic = () => {
		setsubtopicValue([]);
	};

	// update displayed subtopics based on filter side panel
	const updateDisplayedSubtopics = (selectedFilterTags) => {
		const commonContent = selectedFilterTags.filter(tag => {
			return subtopicsGroups.some(([value]) => value.includes(tag));
		});
		const combinedSubtopics = commonContent.flatMap(tag => {
			return subtopicsGroups.find(([value]) => value === tag)?.[1] || [];
		});
		setDisplayedSubtopics(combinedSubtopics);
	};

	// saves selected filters in the side panel
	const onSave = (selectedFilterTags) => {
		updateDisplayedSubtopics(selectedFilterTags);
		setTagsFromFilter(selectedFilterTags);
	};

	return (
		<div>
			<FilterPanel
				filterGroups={filterGroups}
				onSave={(onSave)}
				appliedFilterTags={(appliedFilterTags)}
			/>

			<div className="md:pl-80">
				<FirebaseRetrieveVideos
					dataFromFirebase={dataFromFirebase}
					dataFromIntro={dataFromIntro}
				/>

				<Intro
					introText={introText}
				/>

				<Box style={{ margin: 'auto', width: '70%', paddingBottom: '2rem' }}>
					<Searchbar tagsFromSearchBar={tagsFromSearchBar} tags={tags} />
					<Breadcrumb subtopicValue={subtopicValue} handleResetSubtopic={handleResetSubtopic} subtopics={displayedSubtopics} />
				</Box>

				{displayedSubtopics.length == 0 || subtopicValue.length > 0 || tags.length > 0 ? (
					<YouTubeVideoSection
						osvalue={osvalue}
						subtopicValue={subtopicValue}
						tags={tags}
						appliedFilterTags={appliedFilterTags}
					/>
				) : (
					<SubtopicSelection
						dataFromSubtopicSelector={dataFromSubtopicSelector}
						subtopics={displayedSubtopics} />
				)}
			</div>
		</div >
	);
}

TechVideos.propTypes = {
	initialPageContent: PropTypes.string.isRequired,
	introText: PropTypes.string.isRequired,
};

export default TechVideos;